import { assert, freshServer } from './testSetup'
import { before, it } from 'mocha'

describe('GET debit transaction', () => {
  let statusCode: number
  let resBody: any
  let transactionId: string

  before(async () => {
    const request = freshServer()

    await request.post('/api/transactions').send({
      type: 'credit',
      amount: 9000,
    })

    const debitTransaction = await request.post('/api/transactions').send({
      type: 'credit',
      amount: 7000,
    })

    transactionId = debitTransaction.body.id

    const response = await request.get(`/api/transactions/${transactionId}`)

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
    assert.equal(resBody.type, 'credit')
  })

  it('Returned amount is a positive integer equal to 7000', () => {
    assert.isNumber(resBody.amount)
    assert.isAtLeast(resBody.amount, 0)
    assert.equal(resBody.amount, 7000)
  })

  it('Returned id is a string', () => {
    assert.isString(resBody.id)
  })

  it('Returned effectiveDate is a string', () => {
    assert.isString(resBody.effectiveDate)
  })
})
