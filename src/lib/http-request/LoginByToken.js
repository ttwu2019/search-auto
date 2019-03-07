const request = require("request");

class LoginByToken {
  constructor(cred) {
    this._cred = cred;
    this._session = {};
  }
  async getToken() {
    return new Promise((resolve, reject) => {
      request(
        {
          url: baseUrl + "/api/auth/getToken.json",
          method: "POST",
          json: true,
          headers: {
            "Content-Type": "application/json"
          }
        },
        (errorToken, httpResponse, httpBody) => {
          if (errorToken) reject(errorToken);
          if (httpResponse) {
            const requestToken = httpBody.result.token;
            const jessionId = httpResponse.headers["set-cookie"][0].split(
              ";"
            )[0];
            const ctc = httpResponse.headers["set-cookie"][1].split(";")[0];
            this._session = {
              token: requestToken,
              cookie: ctc + ";" + jessionId
            };
            resolve(this._session);
          }
        }
      );
    });
  }

  async login() {
    return new Promise((resolve, reject) => {
      request(
        {
          url: baseUrl + "/api/auth/login.json",
          method: "POST",
          json: true,
          headers: {
            "Content-Type": "application/json",
            cookie: `${this._session.cookie}`
          },
          body: {
            password: this._cred.password,
            username: this._cred.username,
            __REQUEST_TOKEN__: this._session.token
          }
        },
        (errorLogin, responseLogin, bodyLogin) => {
          if (errorLogin) reject(errorLogin);
          if (responseLogin) {
            const jessionId = responseLogin.headers["set-cookie"][0].split(
              ";"
            )[0];
            resolve(jessionId);
          }
        }
      );
    });
  }
}

module.exports = LoginByToken;
