import { assert, freshServer } from './testSetup'
import { before, it } from 'mocha'

describe('POST invalid credit transactions', () => {
  let statusCode: number
  let resBody: any
  let resText: string

  before(async () => {
    const request = freshServer()
    const response = await request.post('/api/transactions').send({
      type: 'credit',
      amount: 0,
    })

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

  it('Returned text "Invalid input"', async () => {
    assert.isString(resText)
    assert.equal(resText, 'Invalid input')
  })
})
