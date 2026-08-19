import { assert, freshServer } from './testSetup'
import { before, it } from 'mocha'

describe('GET all transactions on creation', () => {
  let statusCode: number
  let resBody: any

  before(async () => {
    const request = freshServer()
    const response = await request.get(`/api/transactions`)

    statusCode = response.status
    resBody = response.body
  })

  it('Returned status 200', () => {
    assert.equal(statusCode, 200)
  })

  it('Response is array of objects', () => {
    assert.isArray(resBody)
    assert.isEmpty(resBody)
  })
})
