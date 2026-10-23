
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AitrainingJobsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AitrainingJobsSDK.test()
    equal(testsdk instanceof AitrainingJobsSDK, true,
      'AitrainingJobsSDK.test() must return a client synchronously')
  })

})
