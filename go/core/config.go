package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AitrainingJobs",
			"slug": "aitraining-jobs",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://aitraining.jobs",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"job": map[string]any{},
				"pay": map[string]any{},
				"role": map[string]any{},
			},
		},
		"entity": map[string]any{
			"job": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "first_seen_at",
						"title": "First Seen At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Kind of work",
					},
					map[string]any{
						"name": "kind_slug",
						"title": "Kind Slug",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "listed",
						"title": "Listed",
						"type": "`$STRING`",
						"req": true,
						"format": "date",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "pay",
						"title": "Pay",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The role's advertised pay, else its platform's typical band (said so in the text)",
					},
					map[string]any{
						"name": "platform",
						"title": "Platform",
						"type": "`$STRING`",
						"req": true,
						"short": "Platform name",
					},
					map[string]any{
						"name": "platform_slug",
						"title": "Platform Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "remote",
						"title": "Remote",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The role's page on AITraining.jobs, where the user applies",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "job",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/jobs",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "jobs",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"jobs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.roles`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "kind",
											"orig": "kind",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "min_hourly_usd",
											"orig": "min_hourly_usd",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "platform",
											"orig": "platform",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "since",
											"orig": "since",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "recent",
										},
										map[string]any{
											"name": "src",
											"orig": "src",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"pay": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "license",
						"title": "License",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "measurement_technique",
						"title": "Measurement Technique",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pay_by_work_type",
						"title": "Pay By Work Type",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"short": "The page that renders the same numbers.",
						"format": "uri",
					},
					map[string]any{
						"name": "temporal_coverage",
						"title": "Temporal Coverage",
						"type": "`$STRING`",
						"short": "The day the figures describe.",
						"format": "date",
					},
					map[string]any{
						"name": "updated",
						"title": "Updated",
						"type": "`$STRING`",
						"short": "When the job feeds were last read (UTC).",
						"format": "date-time",
					},
				},
				"name": "pay",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/pay.json",
								"segments": []any{
									map[string]any{
										"lit": "pay.json",
									},
								},
								"parts": []any{
									"pay.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"role": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "license",
						"title": "License",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "measurement_technique",
						"title": "Measurement Technique",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "open_by_platform",
						"title": "Open By Platform",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "open_by_work_type",
						"title": "Open By Work Type",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "recent_market_momentum",
						"title": "Recent Market Momentum",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"short": "The page that renders the same numbers.",
						"format": "uri",
					},
					map[string]any{
						"name": "temporal_coverage",
						"title": "Temporal Coverage",
						"type": "`$STRING`",
						"short": "The day the figures describe.",
						"format": "date",
					},
					map[string]any{
						"name": "totals",
						"title": "Totals",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "updated",
						"title": "Updated",
						"type": "`$STRING`",
						"short": "When the job feeds were last read (UTC).",
						"format": "date-time",
					},
				},
				"name": "role",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/roles.json",
								"segments": []any{
									map[string]any{
										"lit": "roles.json",
									},
								},
								"parts": []any{
									"roles.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
