const { getPrInfo } = require("./dependabot-comments/utils");

module.exports = async (github, context, core) => {
  const commitHash = process.env.GITHUB_SHA;
  console.log("commit hash", commitHash);

  const prInfo = await getPrInfo(github, context, core, commitHash);

  console.log("get-pr-info", prInfo);

  core.setOutput("prNumber", prInfo.number);
};

