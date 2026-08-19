import chai from 'chai'
import chaiHttp from 'chai-http'
import 'mocha'

chai.use(chaiHttp)
const expect = chai.expect

import { createAppServer } from '../../src/server/appServer'
import { Account } from '../../src/models/Account'

const account = new Account()
const appServer = createAppServer(account);

describe('Root endpoint', async () => {
  it('Should return response on call', async () => {
    const request = chai.request(appServer).get('/');
    const response = await request;

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Server is alive');
  })
});
