// Typed models for the AitrainingJobs SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Job {
  first_seen_at: string
  id: string
  kind?: string | null
  kind_slug?: string | null
  listed: string
  location?: string | null
  pay?: string | null
  platform: string
  platform_slug: string
  remote: boolean
  title: string
  url: string
}

export interface JobListMatch {
  country?: string
  kind?: string
  limit?: number
  min_hourly_usd?: number
  offset?: number
  platform?: string
  q?: string
  since?: string
  sort?: string
  src?: string
}

export interface Pay {
  description?: string
  license?: string
  measurement_technique?: string
  name?: string
  pay_by_work_type?: any[]
  source?: string
  temporal_coverage?: string
  updated?: string
}

export interface PayListMatch {
  description?: string
  license?: string
  measurement_technique?: string
  name?: string
  pay_by_work_type?: any[]
  source?: string
  temporal_coverage?: string
  updated?: string
}

export interface Role {
  description?: string
  license?: string
  measurement_technique?: string
  name?: string
  open_by_platform?: any[]
  open_by_work_type?: any[]
  recent_market_momentum?: Record<string, any> | null
  source?: string
  temporal_coverage?: string
  totals?: Record<string, any>
  updated?: string
}

export interface RoleListMatch {
  description?: string
  license?: string
  measurement_technique?: string
  name?: string
  open_by_platform?: any[]
  open_by_work_type?: any[]
  recent_market_momentum?: Record<string, any> | null
  source?: string
  temporal_coverage?: string
  totals?: Record<string, any>
  updated?: string
}

