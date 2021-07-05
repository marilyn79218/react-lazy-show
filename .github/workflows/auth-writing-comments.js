const actionsGithub = require("../../node_modules/@actions/github");

// It's a testing script to test whether we can generate the authed octokit by ourselves
// And see if it allows dependabot writing comments on pull_request event

const COMMENT_ANCHOR = "dependabot_test";

module.exports = async (github, context, core, authToken) => {
  try {
    console.log("authToken", authToken);
    console.log("context", context);

    const octokit = actionsGithub.getOctokit(token);

    // Find comment id if exist
    const { data: existingComments } = await octokit.issues.listComments({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    let commentId;
    for (let i = existingComments.length; i--; ) {
      const c = existingComments[i];
      if (c.user.type === "Bot" && c.body.includes(COMMENT_ANCHOR)) {
        commentId = c.id;
        break;
      }
    }

    const commentBody = `${COMMENT_ANCHOR}: ${context.actor} - ${context.sha}`;
    if (!commentId) {
      console.log("Creating comment...");
      await octokit.issues.createComment({
        issue_number: prNumber,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: commentBody,
      });
    } else {
      console.log("Updating comment...", commentId);
      await octokit.issues.updateComment({
        comment_id: commentId,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: commentBody,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}