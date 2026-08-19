import { assert, freshServer } from './testSetup'
import { before, it } from 'mocha'

describe('GET invalid transaction', () => {
  let transactionId: string
  let statusCode: number
  let resBody: any
  let resText: string

  before(async () => {
    transactionId = 'debitTransaction.body.id'

    const request = freshServer()
    const response = await request.get(`/api/transactions/${transactionId}`)

    statusCode = response.status
    resBody = response.body
    resText = response.text
  })

  it('Returned status 400', () => {
    assert.equal(statusCode, 400)
  })

  it('Response is JSON', () => {
    assert.isObject(resBody)
  })

  it('Returned text "invalid ID supplied"', async () => {
    assert.isString(resText)
    assert.equal(resText, 'invalid ID supplied')
  })
})
