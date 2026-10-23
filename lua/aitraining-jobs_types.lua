-- Typed models for the AitrainingJobs SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Job
---@field first_seen_at string
---@field id string
---@field kind? string|nil
---@field kind_slug? string|nil
---@field listed string
---@field location? string|nil
---@field pay? string|nil
---@field platform string
---@field platform_slug string
---@field remote boolean
---@field title string
---@field url string

---@class JobListMatch
---@field country? string
---@field kind? string
---@field limit? number
---@field min_hourly_usd? number
---@field offset? number
---@field platform? string
---@field q? string
---@field since? string
---@field sort? string
---@field src? string

---@class Pay
---@field description? string
---@field license? string
---@field measurement_technique? string
---@field name? string
---@field pay_by_work_type? table
---@field source? string
---@field temporal_coverage? string
---@field updated? string

---@class PayListMatch
---@field description? string
---@field license? string
---@field measurement_technique? string
---@field name? string
---@field pay_by_work_type? table
---@field source? string
---@field temporal_coverage? string
---@field updated? string

---@class Role
---@field description? string
---@field license? string
---@field measurement_technique? string
---@field name? string
---@field open_by_platform? table
---@field open_by_work_type? table
---@field recent_market_momentum? table|nil
---@field source? string
---@field temporal_coverage? string
---@field totals? table
---@field updated? string

---@class RoleListMatch
---@field description? string
---@field license? string
---@field measurement_technique? string
---@field name? string
---@field open_by_platform? table
---@field open_by_work_type? table
---@field recent_market_momentum? table|nil
---@field source? string
---@field temporal_coverage? string
---@field totals? table
---@field updated? string

local M = {}

return M
