// Typed models for the AitrainingJobs SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/aitraining-jobs-sdk/go/core"
)

// Job is the typed data model for the job entity.
type Job struct {
}

// JobListMatch is the typed request payload for Job.ListTyped.
type JobListMatch struct {
	Country *string `json:"country,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MinHourlyUsd *int `json:"min_hourly_usd,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Platform *string `json:"platform,omitempty"`
	Q *string `json:"q,omitempty"`
	Since *string `json:"since,omitempty"`
	Sort *string `json:"sort,omitempty"`
	Src *string `json:"src,omitempty"`
}

// Pay is the typed data model for the pay entity.
type Pay struct {
}

// PayListMatch is the typed request payload for Pay.ListTyped.
type PayListMatch struct {
	Description *string `json:"description,omitempty"`
	License *string `json:"license,omitempty"`
	MeasurementTechnique *string `json:"measurement_technique,omitempty"`
	Name *string `json:"name,omitempty"`
	PayByWorkType *[]any `json:"pay_by_work_type,omitempty"`
	Source *string `json:"source,omitempty"`
	TemporalCoverage *string `json:"temporal_coverage,omitempty"`
	Updated *string `json:"updated,omitempty"`
}

// Role is the typed data model for the role entity.
type Role struct {
}

// RoleListMatch is the typed request payload for Role.ListTyped.
type RoleListMatch struct {
	Description *string `json:"description,omitempty"`
	License *string `json:"license,omitempty"`
	MeasurementTechnique *string `json:"measurement_technique,omitempty"`
	Name *string `json:"name,omitempty"`
	OpenByPlatform *[]any `json:"open_by_platform,omitempty"`
	OpenByWorkType *[]any `json:"open_by_work_type,omitempty"`
	RecentMarketMomentum *any `json:"recent_market_momentum,omitempty"`
	Source *string `json:"source,omitempty"`
	TemporalCoverage *string `json:"temporal_coverage,omitempty"`
	Totals *map[string]any `json:"totals,omitempty"`
	Updated *string `json:"updated,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
