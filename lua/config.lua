-- AitrainingJobs SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "AitrainingJobs",
      slug = "aitraining-jobs",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://aitraining.jobs",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["job"] = {},
        ["pay"] = {},
        ["role"] = {},
      },
    },
    entity = {
      ["job"] = {
        ["fields"] = {
          {
            ["name"] = "first_seen_at",
            ["title"] = "First Seen At",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["format"] = "date-time",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "kind",
            ["title"] = "Kind",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "Kind of work",
          },
          {
            ["name"] = "kind_slug",
            ["title"] = "Kind Slug",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "listed",
            ["title"] = "Listed",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["format"] = "date",
          },
          {
            ["name"] = "location",
            ["title"] = "Location",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "pay",
            ["title"] = "Pay",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
            ["short"] = "The role's advertised pay, else its platform's typical band (said so in the text)",
          },
          {
            ["name"] = "platform",
            ["title"] = "Platform",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Platform name",
          },
          {
            ["name"] = "platform_slug",
            ["title"] = "Platform Slug",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "remote",
            ["title"] = "Remote",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The role's page on AITraining.jobs, where the user applies",
            ["format"] = "uri",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "job",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/jobs",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "jobs",
                  },
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "jobs",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.roles`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "kind",
                      ["orig"] = "kind",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "min_hourly_usd",
                      ["orig"] = "min_hourly_usd",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "platform",
                      ["orig"] = "platform",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "since",
                      ["orig"] = "since",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "recent",
                    },
                    {
                      ["name"] = "src",
                      ["orig"] = "src",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["pay"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "license",
            ["title"] = "License",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "measurement_technique",
            ["title"] = "Measurement Technique",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pay_by_work_type",
            ["title"] = "Pay By Work Type",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "source",
            ["title"] = "Source",
            ["type"] = "`$STRING`",
            ["short"] = "The page that renders the same numbers.",
            ["format"] = "uri",
          },
          {
            ["name"] = "temporal_coverage",
            ["title"] = "Temporal Coverage",
            ["type"] = "`$STRING`",
            ["short"] = "The day the figures describe.",
            ["format"] = "date",
          },
          {
            ["name"] = "updated",
            ["title"] = "Updated",
            ["type"] = "`$STRING`",
            ["short"] = "When the job feeds were last read (UTC).",
            ["format"] = "date-time",
          },
        },
        ["name"] = "pay",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/pay.json",
                ["segments"] = {
                  {
                    ["lit"] = "pay.json",
                  },
                },
                ["parts"] = {
                  "pay.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["role"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "license",
            ["title"] = "License",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "measurement_technique",
            ["title"] = "Measurement Technique",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "open_by_platform",
            ["title"] = "Open By Platform",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "open_by_work_type",
            ["title"] = "Open By Work Type",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "recent_market_momentum",
            ["title"] = "Recent Market Momentum",
            ["type"] = {
              "`$ONE`",
              {
                "`$OBJECT`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "source",
            ["title"] = "Source",
            ["type"] = "`$STRING`",
            ["short"] = "The page that renders the same numbers.",
            ["format"] = "uri",
          },
          {
            ["name"] = "temporal_coverage",
            ["title"] = "Temporal Coverage",
            ["type"] = "`$STRING`",
            ["short"] = "The day the figures describe.",
            ["format"] = "date",
          },
          {
            ["name"] = "totals",
            ["title"] = "Totals",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "updated",
            ["title"] = "Updated",
            ["type"] = "`$STRING`",
            ["short"] = "When the job feeds were last read (UTC).",
            ["format"] = "date-time",
          },
        },
        ["name"] = "role",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/roles.json",
                ["segments"] = {
                  {
                    ["lit"] = "roles.json",
                  },
                },
                ["parts"] = {
                  "roles.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
