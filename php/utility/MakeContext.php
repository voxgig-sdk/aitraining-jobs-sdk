<?php
declare(strict_types=1);

// AitrainingJobs SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AitrainingJobsMakeContext
{
    public static function call(array $ctxmap, ?AitrainingJobsContext $basectx): AitrainingJobsContext
    {
        return new AitrainingJobsContext($ctxmap, $basectx);
    }
}
