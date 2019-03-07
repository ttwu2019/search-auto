let SearchingFlow = require("../test_flows/search/Searching");
let AddingFlow = require("../test_flows/add/Adding");

let header = require("../../resources/test_data/add/header.json");
let body = require("../../resources/test_data/add/body.json");

let lists;

describe("search-kintone-auto", () => {
  before("Search results from kintone.", async () => {
    let cred = {
      username: process.env.KIN_USER_NAME,
      password: process.env.KIN_PASSWD
    };
    lists = await new SearchingFlow(cred).search();
  });

  it("Add results to kin app.then verify api post success by statuscode.", () => {
    new AddingFlow(header, body, lists).addAndVerify();
  });
});
