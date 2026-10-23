

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AitrainingJobsSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('JobEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AITRAINING_JOBS_TEST_LIVE=TRUE.
  afterEach(liveDelay('AITRAINING_JOBS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AitrainingJobsSDK.test()
    const ent = testsdk.Job()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('job hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AitrainingJobsSDK.test(offline).Job().stream('list')) { }
    }, /offline/)

    for await (const _item of AitrainingJobsSDK.test(offline).Job()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AitrainingJobsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Job().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AitrainingJobsSDK.test().Job().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AitrainingJobsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Job().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Job().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AitrainingJobsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Job().list({"country":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AITRAINING_JOBS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'job.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"first_seen_at":{"a":true,"fo":"date-time","h":"First Seen At","n":"first_seen_at","r":true,"t":"`$STRING`","key$":"first_seen_at","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":1},"kind":{"a":true,"h":"Kind","n":"kind","r":false,"sh":"Kind of work","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"kind","index$":2},"kind_slug":{"a":true,"h":"Kind Slug","n":"kind_slug","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"kind_slug","index$":3},"listed":{"a":true,"fo":"date","h":"Listed","n":"listed","r":true,"t":"`$STRING`","key$":"listed","index$":4},"location":{"a":true,"h":"Location","n":"location","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"location","index$":5},"pay":{"a":true,"h":"Pay","n":"pay","r":false,"sh":"The role's advertised pay, else its platform's typical band (said so in the text)","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"pay","index$":6},"platform":{"a":true,"h":"Platform","n":"platform","r":true,"sh":"Platform name","t":"`$STRING`","key$":"platform","index$":7},"platform_slug":{"a":true,"h":"Platform Slug","n":"platform_slug","r":true,"t":"`$STRING`","key$":"platform_slug","index$":8},"remote":{"a":true,"h":"Remote","n":"remote","r":true,"t":"`$BOOLEAN`","key$":"remote","index$":9},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":10},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The role's page on AITraining.jobs, where the user applies","t":"`$STRING`","key$":"url","index$":11}},"id":{"field":"id","name":"id"},"name":"job","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/jobs","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"kind","or":"kind","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"min_hourly_usd","or":"min_hourly_usd","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"platform","or":"platform","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"since","or":"since","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":"recent","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":8},{"a":true,"k":"query","n":"src","or":"src","r":false,"t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/api/v1/jobs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"jobs"}],"t":{"req":"`reqdata`","res":"`body.roles`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"job","name__orig":"job","Name":"Job","name_":"job","name-":"job","NAME":"JOB","index$":0}, {"active":true,"entity":"job","key$":"BasicJobFlow","kind":"basic","name":"BasicJobFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"job_ref01"}}],"index$":0}]}, 'Job', {"GET /api/v1/jobs":{"protocol":"http","parameters":[{"name":"q","in":"query","required":false,"description":"Keywords matched against role titles, e.g. physician, Python, Spanish, lawyer.","schema":{"type":"string","maxLength":120},"index$":0},{"name":"kind","in":"query","required":false,"description":"Kind of work: one slug, or several separated by commas.","schema":{"type":"string","enum":["rlhf-eval","coding","stem-math","domain-expert","agentic-eval","data-labeling","robotics-data","multilingual","audio-speech","writing","red-teaming","research-studies"]},"index$":1},{"name":"platform","in":"query","required":false,"description":"Platform slug, e.g. mercor, micro1, outlier-scale-ai, alignerr.","schema":{"type":"string"},"index$":2},{"name":"country","in":"query","required":false,"description":"ISO 3166-1 alpha-2 code: only roles open to applicants in that country, e.g. US, IN, BR.","schema":{"type":"string","minLength":2,"maxLength":2},"index$":3},{"name":"min_hourly_usd","in":"query","required":false,"description":"Only roles whose advertised hourly ceiling reaches this many US dollars.","schema":{"type":"integer","minimum":1,"maximum":1000},"index$":4},{"name":"since","in":"query","required":false,"description":"Only roles first listed on or after this day, YYYY-MM-DD.","schema":{"type":"string","format":"date"},"index$":5},{"name":"sort","in":"query","required":false,"description":"recent (newest first, default), pay (highest pay first) or balanced.","schema":{"type":"string","enum":["recent","pay","balanced"],"default":"recent"},"index$":6},{"name":"limit","in":"query","required":false,"description":"How many roles, 1 to 50.","schema":{"type":"integer","minimum":1,"maximum":50,"default":20},"index$":7},{"name":"offset","in":"query","required":false,"description":"Skip this many roles, for the next page.","schema":{"type":"integer","minimum":0,"default":0},"index$":8},{"name":"src","in":"query","required":false,"description":"Your app's name as a short slug; every role link carries it.","schema":{"type":"string","maxLength":40},"index$":9}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let job_ref01_data = Object.values(setup.data.existing.job)[0] as any

    // LIST
    const job_ref01_ent = client.Job()
    const job_ref01_match: any = {}

    const job_ref01_list = (await job_ref01_ent.list(job_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/job/JobTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AitrainingJobsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['job01','job02','job03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AITRAINING_JOBS_TEST_JOB_ENTID': idmap,
    'AITRAINING_JOBS_TEST_LIVE': 'FALSE',
    'AITRAINING_JOBS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AITRAINING_JOBS_TEST_JOB_ENTID']

  const live = 'TRUE' === env.AITRAINING_JOBS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AITRAINING_JOBS_TEST_JOB_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AitrainingJobsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.AITRAINING_JOBS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
