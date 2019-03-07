const api = require("tcb-api-rest");
const assert = api.assert;
const AddRecordsToKintone = require("../../lib/rest-api/AddRecordsToKintone");
let date = require("../../lib/date");

class Adding extends AddRecordsToKintone {
  constructor(header, body, lists) {
    super(header, body);
    this._lists = lists;
    this._statusCode = [];
    this._record = this._body.body.record;
  }

  addAndVerify() {
    this._header.url = baseUrl + this._header.url;
    if (this._lists.length == 0) {
      console.log(`-----Searching has no results.-----`);
    } else {
      for (let i = 0; i < this._lists.length; i++) {
        this._body.body.app = kinId;
        this._record.create.value = this._lists[i].creator;
        if (this._lists[i].appId != null) {
          this._record.url.value = `${baseUrl}/k/${this._lists[i].appId}`;
          this._record.app.value = this._lists[i].appName;
          if (this._lists[i].recordId != null) {
            this._record.url.value = this._record.url.value.concat(
              `/show#record=${this._lists[i].recordId}&tab=comments&mode=show`
            );
            this._record.record.value = this._lists[i].recordTile;
          }
          if (this._lists[i].recordCommentId != null) {
            this._record.url.value = this._record.url.value.concat(
              `&comment=${this._lists[i].recordCommentId}`
            );
          }
        } else if (this._lists[i].spaceId != null) {
          this._record.url.value = `${baseUrl}/k/#/space/${
            this._lists[i].spaceId
          }`;
          this._record.space.value = this._lists[i].spaceName;
          if (this._lists[i].threadId != null) {
            this._record.url.value = this._record.url.value.concat(
              `/thread/${this._lists[i].threadId}`
            );
            this._record.thread.value = this._lists[i].threadName;
          }
          if (this._lists[i].postId != null) {
            this._record.url.value = this._record.url.value.concat(
              `/${this._lists[i].postId}`
            );
          }
          if (this._lists[i].postCommentId != null) {
            this._record.url.value = this._record.url.value.concat(
              `/${this._lists[i].postCommentId}`
            );
          }
        } else if (this._lists[i].people != null) {
          this._record.url.value = `${baseUrl}/k/#/people/user/${
            this._lists[i].people[0].code
          }`;
          this._record.people.value = this._lists[i].people;
          if (this._lists[i].postId != null) {
            this._record.url.value = this._record.url.value.concat(
              `/${this._lists[i].postId}`
            );
          }
          if (this._lists[i].postCommentId != null) {
            this._record.url.value = this._record.url.value.concat(
              `/${this._lists[i].postCommentId}`
            );
          }
        }

        this._setValueToDefault(this._lists[i]);
        this._record.summary.value = this._lists[i].content;
        this._record.date.value = date.today;
        let statusCode = this.addRecordsToKintone();
        this._verifyAddSuccess(statusCode);
        console.log(
          `-----Searching results ${i} was added to [Cytra search results] app.-----`
        );
      }
    }
  }

  _verifyAddSuccess(statusCode) {
    assert.assertEqual(statusCode, 200);
  }

  _setValueToDefault(list) {
    if (list.appId == null) {
      this._record.app.value = "";
    }
    if (list.spaceId == null) {
      this._record.space.value = "";
    }
    if (list.recordId == null) {
      this._record.record.value = "";
    }
    if (list.threadId == null) {
      this._record.thread.value = "";
    }
    if (list.people == null) {
      this._record.people.value = [];
    }
  }
}

module.exports = Adding;
