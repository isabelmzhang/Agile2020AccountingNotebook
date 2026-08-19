import chai from 'chai'
import chaiHttp from 'chai-http'
import 'mocha'
import { createAppServer } from '../../src/server/appServer'
import { Account } from '../../src/models/Account'

chai.use(chaiHttp)

export const assert = chai.assert

export function freshServer() {
  const account = new Account()
  const appServer = createAppServer(account)
  return chai.request(appServer)
}
