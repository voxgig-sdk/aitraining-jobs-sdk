<?php
declare(strict_types=1);

// Typed models for the AitrainingJobs SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Job entity data model. */
class Job
{
    public string $first_seen_at;
    public string $id;
    public mixed $kind = null;
    public mixed $kind_slug = null;
    public string $listed;
    public mixed $location = null;
    public mixed $pay = null;
    public string $platform;
    public string $platform_slug;
    public bool $remote;
    public string $title;
    public string $url;
}

/** Request payload for Job#list. */
class JobListMatch
{
    public ?string $country = null;
    public ?string $kind = null;
    public ?int $limit = null;
    public ?int $min_hourly_usd = null;
    public ?int $offset = null;
    public ?string $platform = null;
    public ?string $q = null;
    public ?string $since = null;
    public ?string $sort = null;
    public ?string $src = null;
}

/** Pay entity data model. */
class Pay
{
    public ?string $description = null;
    public ?string $license = null;
    public ?string $measurement_technique = null;
    public ?string $name = null;
    public ?array $pay_by_work_type = null;
    public ?string $source = null;
    public ?string $temporal_coverage = null;
    public ?string $updated = null;
}

/** Request payload for Pay#list. */
class PayListMatch
{
    public ?string $description = null;
    public ?string $license = null;
    public ?string $measurement_technique = null;
    public ?string $name = null;
    public ?array $pay_by_work_type = null;
    public ?string $source = null;
    public ?string $temporal_coverage = null;
    public ?string $updated = null;
}

/** Role entity data model. */
class Role
{
    public ?string $description = null;
    public ?string $license = null;
    public ?string $measurement_technique = null;
    public ?string $name = null;
    public ?array $open_by_platform = null;
    public ?array $open_by_work_type = null;
    public mixed $recent_market_momentum = null;
    public ?string $source = null;
    public ?string $temporal_coverage = null;
    public ?array $totals = null;
    public ?string $updated = null;
}

/** Request payload for Role#list. */
class RoleListMatch
{
    public ?string $description = null;
    public ?string $license = null;
    public ?string $measurement_technique = null;
    public ?string $name = null;
    public ?array $open_by_platform = null;
    public ?array $open_by_work_type = null;
    public mixed $recent_market_momentum = null;
    public ?string $source = null;
    public ?string $temporal_coverage = null;
    public ?array $totals = null;
    public ?string $updated = null;
}

