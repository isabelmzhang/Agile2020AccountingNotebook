import { assert, freshServer } from './testSetup'
import { before, it } from 'mocha'

describe('GET account value from creation', () => {
  let statusCode: number
  let resBody: any

  before(async () => {
    const request = freshServer()
    const response = await request.get('/api')

    statusCode = response.status
    resBody = response.body
  })

  it('Returned status 200', async () => {
    assert.equal(statusCode, 200)
  })

  it('Response is JSON', async () => {
    assert.isObject(resBody)
  })

  it('Response includes balance', async () => {
    assert.isDefined(resBody.balance)
  })

  it('Returned balance is a positive integer', async () => {
    assert.isNumber(resBody.balance)
    assert.isAtLeast(resBody.balance, 0)
    assert.equal(resBody.balance, 0)
  })
})
