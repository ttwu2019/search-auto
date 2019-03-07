let LoginByToken = require("../../lib/http-request/LoginByToken");
let SearchFromKintone = require("../../lib/http-request/SearchFromKintone");

class Searching extends SearchFromKintone {
  async search() {
    const loginByToken = new LoginByToken(this._cred);
    const session = await loginByToken.getToken();
    const jessionId = await loginByToken.login();

    let searchResults = await new SearchFromKintone(session).SearchFromKintone(
      jessionId
    );
    return searchResults;
  }
}

module.exports = Searching;
