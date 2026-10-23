<?php
declare(strict_types=1);

// AitrainingJobs SDK context

require_once __DIR__ . '/Control.php';
require_once __DIR__ . '/Operation.php';
require_once __DIR__ . '/Spec.php';
require_once __DIR__ . '/Result.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Error.php';
require_once __DIR__ . '/Helpers.php';

class AitrainingJobsContext implements \JsonSerializable
{
    public string $id;
    public array $out;
    public mixed $client;
    public ?AitrainingJobsUtility $utility;
    public AitrainingJobsControl $ctrl;
    public array $meta;
    public ?array $config;
    public ?array $entopts;
    public ?array $options;
    public mixed $entity;
    public ?array $shared;
    public array $opmap;
    public array $data;
    public array $reqdata;
    public array $match;
    public array $reqmatch;
    public ?array $point;
    public ?AitrainingJobsSpec $spec;
    public ?AitrainingJobsResult $result;
    public ?AitrainingJobsResponse $response;
    public AitrainingJobsOperation $op;
    // Set by make_error as it fires PreUnexpected, which fires once per
    // operation.
    public bool $unexpected_fired = false;

    public function __construct(array $ctxmap = [], ?self $basectx = null)
    {
        $this->id = 'C' . random_int(10000000, 99999999);
        $this->out = [];

        $this->client = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'client') ?? ($basectx ? $basectx->client : null);
        $this->utility = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'utility') ?? ($basectx ? $basectx->utility : null);

        $this->ctrl = new AitrainingJobsControl();
        $ctrl_raw = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'ctrl');
        if (is_array($ctrl_raw)) {
            if (array_key_exists('throw', $ctrl_raw)) {
                $this->ctrl->throw_err = $ctrl_raw['throw'];
            }
            if (isset($ctrl_raw['explain']) && is_array($ctrl_raw['explain'])) {
                $this->ctrl->explain = $ctrl_raw['explain'];
            }
            if (array_key_exists('actor', $ctrl_raw)) {
                $this->ctrl->actor = $ctrl_raw['actor'];
            }
            if (isset($ctrl_raw['paging']) && is_array($ctrl_raw['paging'])) {
                $this->ctrl->paging = $ctrl_raw['paging'];
            }
        } elseif ($basectx !== null && $basectx->ctrl !== null
            && AitrainingJobsHelpers::get_ctx_prop($ctxmap, "opname") === null) {
            $this->ctrl = $basectx->ctrl;
        }

        $m = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'meta');
        $this->meta = is_array($m) ? $m : ($basectx ? $basectx->meta ?? [] : []);

        $cfg = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'config');
        $this->config = is_array($cfg) ? $cfg : ($basectx ? $basectx->config : null);

        $eo = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'entopts');
        $this->entopts = is_array($eo) ? $eo : ($basectx ? $basectx->entopts : null);

        $o = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'options');
        $this->options = is_array($o) ? $o : ($basectx ? $basectx->options : null);

        $e = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'entity');
        $this->entity = $e ?? ($basectx ? $basectx->entity : null);

        $s = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'shared');
        $this->shared = is_array($s) ? $s : ($basectx ? $basectx->shared : null);

        $om = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'opmap');
        $this->opmap = is_array($om) ? $om : ($basectx ? $basectx->opmap ?? [] : []);

        $this->data = AitrainingJobsHelpers::to_map(AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'data')) ?? [];
        $this->reqdata = AitrainingJobsHelpers::to_map(AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'reqdata')) ?? [];
        $this->match = AitrainingJobsHelpers::to_map(AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'match')) ?? [];
        $this->reqmatch = AitrainingJobsHelpers::to_map(AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'reqmatch')) ?? [];

        $pt = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'point');
        $this->point = is_array($pt) ? $pt : ($basectx ? $basectx->point : null);

        $sp = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'spec');
        $this->spec = ($sp instanceof AitrainingJobsSpec) ? $sp : ($basectx ? $basectx->spec : null);

        $r = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'result');
        $this->result = ($r instanceof AitrainingJobsResult) ? $r : ($basectx ? $basectx->result : null);

        $rp = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'response');
        $this->response = ($rp instanceof AitrainingJobsResponse) ? $rp : ($basectx ? $basectx->response : null);

        $opname = AitrainingJobsHelpers::get_ctx_prop($ctxmap, 'opname') ?? '';
        $this->op = $this->resolve_op($opname);
    }

    public function resolve_op(string $opname): AitrainingJobsOperation
    {
        // Cache key is `<entity>:<opname>` so two entities with the same op
        // (e.g. both have a "list") get distinct cached Operations. Keying
        // on opname alone caused the first-resolved entity's points to be
        // served to every subsequent entity's call.
        $entname = (is_object($this->entity) && method_exists($this->entity, 'get_name'))
            ? $this->entity->get_name()
            : '_';
        $cacheKey = $entname . ':' . $opname;

        if (isset($this->opmap[$cacheKey])) {
            return $this->opmap[$cacheKey];
        }
        if ($opname === '') {
            return new AitrainingJobsOperation([]);
        }

        $opcfg = \Voxgig\Struct\Struct::getpath($this->config, "entity.{$entname}.op.{$opname}");

        $input = ($opname === 'update' || $opname === 'create' || $opname === 'patch') ? 'data' : 'match';

        $points = [];
        if (is_array($opcfg)) {
            $t = \Voxgig\Struct\Struct::getprop($opcfg, 'points');
            if (is_array($t)) {
                $points = $t;
            }
        }

        $op = new AitrainingJobsOperation([
            'entity' => $entname,
            'name' => $opname,
            'input' => $input,
            'points' => $points,
        ]);
        $this->opmap[$cacheKey] = $op;
        return $op;
    }

    public function make_error(string $code, string $msg): AitrainingJobsError
    {
        return new AitrainingJobsError($code, $msg, $this);
    }

    // The serialised context leaves the pipeline (a logger, a dump), so it
    // is cleaned; the live fields stay raw for the pipeline's own use.
    public function jsonSerialize(): mixed
    {
        $record = [
            'id' => $this->id,
            'op' => $this->op,
            'spec' => $this->spec,
            'entity' => $this->entity,
            'result' => $this->result,
            'response' => $this->response,
            'meta' => $this->meta,
        ];
        $clean = null === $this->utility ? null : $this->utility->clean;
        return is_callable($clean) ? $clean($this, $record) : $record;
    }

    public function __debugInfo(): array
    {
        $record = $this->jsonSerialize();
        return is_array($record) ? $record : ['record' => $record];
    }
}
