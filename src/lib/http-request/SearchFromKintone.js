const request = require("request");
var htmlDecode = require("js-htmlencode").htmlDecode;
let date = require("../date");
let LoginByToken = require("./LoginByToken");

class SearchFromKintone extends LoginByToken {
  async SearchFromKintone(jsessionId) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: baseUrl + "/k/api/search/search.json",
          method: "POST",
          json: true,
          headers: {
            "Content-Type": "application/json",
            cookie: `${jsessionId}`
          },
          body: {
            keyword: keyword,
            createdDateLower: date.today,
            createdDateUpper: date.today,
            sortOrder: "DATETIME",
            start: "0",
            tzOffset: 540,
            __REQUEST_TOKEN__: this._session.token
          }
        },
        (error, response, body) => {
          if (error) reject(error);
          if (response) {
            let lists = [];
            let results = body.result.docs;
            let appId,
              appName,
              recordId,
              recordTile,
              recordCommentId,
              spaceId,
              spaceName,
              threadId,
              threadName,
              people,
              postId,
              postCommentId,
              content,
              creator;
            for (let i = 0; i < results.length; i++) {
              if (results[i].app != null) {
                appId = results[i].app.id;
                appName = results[i].app.name;
              } else {
                appId = null;
                appName = null;
              }
              if (results[i].record != null) {
                recordId = results[i].record.id;
                recordTile = results[i].record.title;
              } else {
                recordId = null;
                recordTile = null;
              }
              if (results[i].recordCommentLocalId != null) {
                recordCommentId = results[i].recordCommentLocalId;
              } else {
                recordCommentId = null;
              }
              if (results[i].space != null) {
                spaceId = results[i].space.id;
                spaceName = results[i].space.name;
              } else {
                spaceId = null;
                spaceName = null;
              }
              if (results[i].thread != null) {
                threadId = results[i].thread.id;
                threadName = results[i].thread.name;
              } else {
                threadId = null;
                threadName = null;
              }
              if (results[i].peopleUser != null) {
                people = [
                  {
                    code: results[i].peopleUser.code,
                    name: results[i].peopleUser.name
                  }
                ];
              } else {
                people = null;
              }
              postId = results[i].postId;
              postCommentId = results[i].postCommentId;
              content = results[i].highlight;
              content = htmlDecode(content);
              content = content.replace(/<strong>/g, "");
              content = content.replace(/<\/strong>/g, "");
              creator = [
                { code: results[i].creator.code, name: results[i].creator.name }
              ];
              lists.push({
                appId: appId,
                appName: appName,
                recordId: recordId,
                recordTile: recordTile,
                recordCommentId: recordCommentId,
                spaceId: spaceId,
                spaceName: spaceName,
                threadId: threadId,
                threadName: threadName,
                people: people,
                postId: postId,
                postCommentId: postCommentId,
                content: content,
                creator: creator
              });
            }
            resolve(lists);
          }
        }
      );
    });
  }
}

module.exports = SearchFromKintone;
