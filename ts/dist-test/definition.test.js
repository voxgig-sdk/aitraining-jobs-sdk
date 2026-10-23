"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "job",
        "accessor": "Job",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/jobs",
        "args": [],
        "select": {
            "country": "v1",
            "kind": "v1",
            "limit": 20,
            "min_hourly_usd": "v1",
            "offset": 0,
            "platform": "v1",
            "q": "v1",
            "since": "v1",
            "sort": "recent",
            "src": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "q",
            "kind",
            "platform",
            "country",
            "min_hourly_usd",
            "since",
            "sort",
            "limit",
            "offset",
            "src"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "kind",
                "wire": "kind"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "min_hourly_usd",
                "wire": "min_hourly_usd"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "platform",
                "wire": "platform"
            },
            {
                "name": "q",
                "wire": "q"
            },
            {
                "name": "since",
                "wire": "since"
            },
            {
                "name": "sort",
                "wire": "sort"
            },
            {
                "name": "src",
                "wire": "src"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "total": 1,
            "roles": [
                {
                    "id": "x",
                    "title": "x",
                    "platform": "x",
                    "platform_slug": "x",
                    "kind": "x",
                    "kind_slug": "x",
                    "pay": "x",
                    "location": "x",
                    "remote": true,
                    "listed": "2026-01-01",
                    "first_seen_at": "2026-01-01T00:00:00Z",
                    "url": "x"
                }
            ],
            "more": "x"
        },
        "idField": "id"
    },
    {
        "entity": "pay",
        "accessor": "Pay",
        "op": "list",
        "method": "GET",
        "path": "/pay.json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "x",
            "description": "x",
            "source": "x",
            "license": "x",
            "measurement_technique": "x",
            "updated": "2026-01-01T00:00:00Z",
            "temporal_coverage": "2026-01-01",
            "pay_by_work_type": [
                {
                    "currency": "x",
                    "unit": "x",
                    "median": 1,
                    "typical_low": 1,
                    "typical_high": 1,
                    "rate_samples": 1,
                    "platforms": 1,
                    "slug": "x",
                    "label": "x",
                    "open_total": 1,
                    "unpriced": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "role",
        "accessor": "Role",
        "op": "list",
        "method": "GET",
        "path": "/roles.json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "x",
            "description": "x",
            "source": "x",
            "license": "x",
            "measurement_technique": "x",
            "updated": "2026-01-01T00:00:00Z",
            "temporal_coverage": "2026-01-01",
            "totals": {
                "open_roles": 1,
                "platforms_live": 1,
                "new_last_7d": 1,
                "new_last_7d_measurement": "x"
            },
            "recent_market_momentum": {
                "unit": "x",
                "measurement": "x",
                "avg_new_roles_per_week": 1,
                "weeks_measured": 1,
                "weekly": [
                    {
                        "week_start": "2026-01-01",
                        "new_roles": 1
                    }
                ]
            },
            "open_by_work_type": [
                {
                    "currency": "x",
                    "unit": "x",
                    "median": 1,
                    "typical_low": 1,
                    "typical_high": 1,
                    "rate_samples": 1,
                    "platforms": 1,
                    "slug": "x",
                    "label": "x",
                    "open_count": 1
                }
            ],
            "open_by_platform": [
                {
                    "slug": "x",
                    "name": "x",
                    "open_count": 1
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map