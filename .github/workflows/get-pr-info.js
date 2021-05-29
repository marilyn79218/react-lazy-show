
module.exports = async (github, context, core) => {
  // Get PR associated with commit hash
  const listPrResponse = await github.repos.listPullRequestsAssociatedWithCommit(
    {
      owner: context.repo.owner,
      repo: context.repo.repo,
      commit_sha: process.env.GITHUB_SHA,
    },
  );

  if (listPrResponse.data.length === 0) {
    // Should not happen, since all our commits to master are via merged PRs.
    console.log("Commit hash not associated with any PR");
    return;
  }
  
  const prInfo = listPrResponse.data[0];
  console.log("get-pr-info", prInfo);

  // core.setOutput("prInfo", prInfo);

  // By default, the return value of the function is JSON-encoded (?)
  // Ref: https://github.com/actions/github-script#reading-step-results
  return prInfo;
};