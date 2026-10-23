# Typed models for the AitrainingJobs SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class JobRequired(TypedDict):
    first_seen_at: str
    id: str
    listed: str
    platform: str
    platform_slug: str
    remote: bool
    title: str
    url: str


class Job(JobRequired, total=False):
    kind: str | None
    kind_slug: str | None
    location: str | None
    pay: str | None


class JobListMatch(TypedDict, total=False):
    country: str
    kind: str
    limit: int
    min_hourly_usd: int
    offset: int
    platform: str
    q: str
    since: str
    sort: str
    src: str


class Pay(TypedDict, total=False):
    description: str
    license: str
    measurement_technique: str
    name: str
    pay_by_work_type: list
    source: str
    temporal_coverage: str
    updated: str


class PayListMatch(TypedDict, total=False):
    description: str
    license: str
    measurement_technique: str
    name: str
    pay_by_work_type: list
    source: str
    temporal_coverage: str
    updated: str


class Role(TypedDict, total=False):
    description: str
    license: str
    measurement_technique: str
    name: str
    open_by_platform: list
    open_by_work_type: list
    recent_market_momentum: dict | None
    source: str
    temporal_coverage: str
    totals: dict
    updated: str


class RoleListMatch(TypedDict, total=False):
    description: str
    license: str
    measurement_technique: str
    name: str
    open_by_platform: list
    open_by_work_type: list
    recent_market_momentum: dict | None
    source: str
    temporal_coverage: str
    totals: dict
    updated: str
