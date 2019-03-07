const api = require("tcb-api-rest");

class AddRecordsToKintone {
  constructor(header, body) {
    this._header = header;
    this._body = body;
  }

  addRecordsToKintone() {
    this._response = api.post(this._header, this._body);
    return this._response.statusCode;
  }
}

module.exports = AddRecordsToKintone;
