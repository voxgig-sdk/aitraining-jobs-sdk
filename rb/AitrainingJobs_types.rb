# frozen_string_literal: true

# Typed models for the AitrainingJobs SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Job entity data model.
#
# @!attribute [rw] first_seen_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [Object, nil]
#
# @!attribute [rw] kind_slug
#   @return [Object, nil]
#
# @!attribute [rw] listed
#   @return [String]
#
# @!attribute [rw] location
#   @return [Object, nil]
#
# @!attribute [rw] pay
#   @return [Object, nil]
#
# @!attribute [rw] platform
#   @return [String]
#
# @!attribute [rw] platform_slug
#   @return [String]
#
# @!attribute [rw] remote
#   @return [Boolean]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
Job = Struct.new(
  :first_seen_at,
  :id,
  :kind,
  :kind_slug,
  :listed,
  :location,
  :pay,
  :platform,
  :platform_slug,
  :remote,
  :title,
  :url,
  keyword_init: true
)

# Request payload for Job#list.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] min_hourly_usd
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] src
#   @return [String, nil]
JobListMatch = Struct.new(
  :country,
  :kind,
  :limit,
  :min_hourly_usd,
  :offset,
  :platform,
  :q,
  :since,
  :sort,
  :src,
  keyword_init: true
)

# Pay entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] measurement_technique
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pay_by_work_type
#   @return [Array, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] temporal_coverage
#   @return [String, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
Pay = Struct.new(
  :description,
  :license,
  :measurement_technique,
  :name,
  :pay_by_work_type,
  :source,
  :temporal_coverage,
  :updated,
  keyword_init: true
)

# Request payload for Pay#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] measurement_technique
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pay_by_work_type
#   @return [Array, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] temporal_coverage
#   @return [String, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
PayListMatch = Struct.new(
  :description,
  :license,
  :measurement_technique,
  :name,
  :pay_by_work_type,
  :source,
  :temporal_coverage,
  :updated,
  keyword_init: true
)

# Role entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] measurement_technique
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] open_by_platform
#   @return [Array, nil]
#
# @!attribute [rw] open_by_work_type
#   @return [Array, nil]
#
# @!attribute [rw] recent_market_momentum
#   @return [Object, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] temporal_coverage
#   @return [String, nil]
#
# @!attribute [rw] totals
#   @return [Hash, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
Role = Struct.new(
  :description,
  :license,
  :measurement_technique,
  :name,
  :open_by_platform,
  :open_by_work_type,
  :recent_market_momentum,
  :source,
  :temporal_coverage,
  :totals,
  :updated,
  keyword_init: true
)

# Request payload for Role#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] measurement_technique
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] open_by_platform
#   @return [Array, nil]
#
# @!attribute [rw] open_by_work_type
#   @return [Array, nil]
#
# @!attribute [rw] recent_market_momentum
#   @return [Object, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] temporal_coverage
#   @return [String, nil]
#
# @!attribute [rw] totals
#   @return [Hash, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
RoleListMatch = Struct.new(
  :description,
  :license,
  :measurement_technique,
  :name,
  :open_by_platform,
  :open_by_work_type,
  :recent_market_momentum,
  :source,
  :temporal_coverage,
  :totals,
  :updated,
  keyword_init: true
)

