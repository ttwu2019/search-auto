exports.config = {
  suites: {
    test: ["src/test_scripts/search.js"]
  },
  specs: ["src/test_scripts/search.js"],
  reporters: ["junit", "dot"],
  reporterOptions: {
    junit: {
      outputDir: "reports/"
    }
  },

  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 600000
  },

  before: test => {
    global.baseUrl = process.env.BASE_URL;
    global.kinId = process.env.KIN_APP_ID;
    global.keyword = process.env.KEY_WORD;
    global.startDate = process.env.START_DATE;
    global.endDate = process.env.END_DATE;
  },

  beforeTest: test => {
    console.log("[TEST CASE]:", test.title);
  },

  afterTest: test => {
    if (test.passed === true) {
      console.log("\t", "--> [STATUS]:", "PASSED");
    } else {
      console.log("\t", "--> [STATUS]:", "FAILED");
    }
  }
};
