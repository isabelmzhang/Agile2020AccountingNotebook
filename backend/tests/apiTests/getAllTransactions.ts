import { assert, freshServer } from './testSetup'
import { before, it } from 'mocha'

describe('GET all transactions', () => {
  let statusCode: number
  let resBody: any

  before(async () => {
    const request = freshServer()

    await request.post('/api/transactions').send({
      type: 'credit',
      amount: 3590,
    })

    await request.post('/api/transactions').send({
      type: 'debit',
      amount: 2500,
    })

    const response = await request.get(`/api/transactions`)

    statusCode = response.status
    resBody = response.body
  })

  it('Returned status 200', () => {
    assert.equal(statusCode, 200)
  })

  it('Response is array of objects', () => {
    assert.isArray(resBody)
    assert.isObject(resBody[0])
  })

  it('Response includes type, amount, id, effectiveDate', () => {
    assert.isDefined(resBody[0].type)
    assert.isDefined(resBody[0].amount)
    assert.isDefined(resBody[0].id)
    assert.isDefined(resBody[0].effectiveDate)
  })

  it('Returned object type is a string equal to credit', () => {
    assert.isString(resBody[0].type)
    assert.equal(resBody[0].type, 'credit')
  })

  it('Returned object type is a string equal to debit', () => {
    assert.isString(resBody[1].type)
    assert.equal(resBody[1].type, 'debit')
  })

  it('Returned amount is a positive integer equal to 3590', () => {
    assert.isNumber(resBody[0].amount)
    assert.isAtLeast(resBody[0].amount, 0)
    assert.equal(resBody[0].amount, 3590)
  })

  it('Returned amount is a positive integer equal to 2500', () => {
    assert.isNumber(resBody[1].amount)
    assert.isAtLeast(resBody[1].amount, 0)
    assert.equal(resBody[1].amount, 2500)
  })

  it('Returned id is a string', () => {
    assert.isString(resBody[0].id)
  })

  it('Returned effectiveDate is a string', () => {
    assert.isString(resBody[0].effectiveDate)
  })
})
