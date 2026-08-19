import { assert, freshServer } from './testSetup'
import { before, it } from 'mocha'

describe('GET account value after transaction', () => {
  let statusCode: number
  let resBody: any

  before(async () => {
    const request = freshServer()

    await request.post('/api/transactions').send({
      type: 'credit',
      amount: 5000,
    })

    await request.post('/api/transactions').send({
      type: 'debit',
      amount: 2000,
    })

    await request.post('/api/transactions').send({
      type: 'credit',
      amount: 1000,
    })

    const response = await request.get('/api')

    statusCode = response.status
    resBody = response.body
  })

  it('Returned status 200', () => {
    assert.equal(statusCode, 200)
  })

  it('Response is JSON', () => {
    assert.isObject(resBody)
  })

  it('Response includes balance', async () => {
    assert.isDefined(resBody.balance)
  })

  it('Returned balance is a positive integer', async () => {
    assert.isNumber(resBody.balance)
    assert.isAtLeast(resBody.balance, 0)
    assert.equal(resBody.balance, 4000)
  })
})
