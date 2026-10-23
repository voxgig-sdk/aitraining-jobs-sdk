

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


describe('RoleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AITRAINING_JOBS_TEST_LIVE=TRUE.
  afterEach(liveDelay('AITRAINING_JOBS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AitrainingJobsSDK.test()
    const ent = testsdk.Role()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('role hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AitrainingJobsSDK.test(offline).Role().stream('list')) { }
    }, /offline/)

    for await (const _item of AitrainingJobsSDK.test(offline).Role()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AitrainingJobsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Role().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AitrainingJobsSDK.test().Role().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AitrainingJobsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Role().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Role().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AitrainingJobsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Role().list({"description":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AITRAINING_JOBS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'role.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":0},"license":{"a":true,"fo":"uri","h":"License","n":"license","r":false,"t":"`$STRING`","key$":"license","index$":1},"measurement_technique":{"a":true,"h":"Measurement Technique","n":"measurement_technique","r":false,"t":"`$STRING`","key$":"measurement_technique","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":3},"open_by_platform":{"a":true,"h":"Open By Platform","n":"open_by_platform","r":false,"t":"`$ARRAY`","key$":"open_by_platform","index$":4},"open_by_work_type":{"a":true,"h":"Open By Work Type","n":"open_by_work_type","r":false,"t":"`$ARRAY`","key$":"open_by_work_type","index$":5},"recent_market_momentum":{"a":true,"h":"Recent Market Momentum","n":"recent_market_momentum","r":false,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"recent_market_momentum","index$":6},"source":{"a":true,"fo":"uri","h":"Source","n":"source","r":false,"sh":"The page that renders the same numbers.","t":"`$STRING`","key$":"source","index$":7},"temporal_coverage":{"a":true,"fo":"date","h":"Temporal Coverage","n":"temporal_coverage","r":false,"sh":"The day the figures describe.","t":"`$STRING`","key$":"temporal_coverage","index$":8},"totals":{"a":true,"h":"Totals","n":"totals","r":false,"t":"`$OBJECT`","key$":"totals","index$":9},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":false,"sh":"When the job feeds were last read (UTC).","t":"`$STRING`","key$":"updated","index$":10}},"name":"role","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /roles.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/roles.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"roles.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"role","name__orig":"role","Name":"Role","name_":"role","name-":"role","NAME":"ROLE","index$":2}, {"active":true,"entity":"role","key$":"BasicRoleFlow","kind":"basic","name":"BasicRoleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"role_ref01"}}],"index$":0}]}, 'Role', {"GET /roles.json":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let role_ref01_data = Object.values(setup.data.existing.role)[0] as any

    // LIST
    const role_ref01_ent = client.Role()
    const role_ref01_match: any = {}

    const role_ref01_list = (await role_ref01_ent.list(role_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/role/RoleTestData.json')

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
    ['role01','role02','role03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AITRAINING_JOBS_TEST_ROLE_ENTID': idmap,
    'AITRAINING_JOBS_TEST_LIVE': 'FALSE',
    'AITRAINING_JOBS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AITRAINING_JOBS_TEST_ROLE_ENTID']

  const live = 'TRUE' === env.AITRAINING_JOBS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AITRAINING_JOBS_TEST_ROLE_ENTID']
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
  
