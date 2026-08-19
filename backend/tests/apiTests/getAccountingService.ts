import { assert, freshServer } from './testSetup'
import { before, it } from 'mocha'

describe('GET account server', () => {
  let statusCode: number
  let resBody: any
  let resText: string

  before(async () => {
    const response = await freshServer().get('/')
    statusCode = response.status
    resBody = response.body
    resText = response.text
  })

  it('Returned status 200', async () => {
    assert.equal(statusCode, 200)
  })

  it('Response is JSON', async () => {
    assert.isObject(resBody)
  })

  it('Returned text "Server is alive"', async () => {
    assert.isString(resText)
    assert.equal(resText, 'Server is alive')
  })
})
