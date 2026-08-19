import { assert, freshServer } from './testSetup'
import { before, it } from 'mocha'

describe('POST debit transaction', () => {
  let statusCode: number
  let resBody: any

  before(async () => {
    const request = freshServer()

    await request.post('/api/transactions').send({
      type: 'credit',
      amount: 1000,
    })

    const response = await request.post('/api/transactions').send({
      type: 'debit',
      amount: 4000,
    })

    statusCode = response.status
    resBody = response.body
  })

  it('Returned status 200', () => {
    assert.equal(statusCode, 200)
  })

  it('Response is JSON', () => {
    assert.isObject(resBody)
  })

  it('Response includes type, amount, id, effectiveDate', () => {
    assert.isDefined(resBody.type)
    assert.isDefined(resBody.amount)
    assert.isDefined(resBody.id)
    assert.isDefined(resBody.effectiveDate)
  })

  it('Returned type is a string equal to debit', () => {
    assert.isString(resBody.type)
    assert.equal(resBody.type, 'debit')
  })

  it('Returned amount is a positive integer equal to 4000', () => {
    assert.isNumber(resBody.amount)
    assert.isAtLeast(resBody.amount, 0)
    assert.equal(resBody.amount, 4000)
  })

  it('Returned id is a string', () => {
    assert.isString(resBody.id)
  })

  it('Returned effectiveDate is a string', () => {
    assert.isString(resBody.effectiveDate)
  })
})
