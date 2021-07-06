const actionsGithub = require(`${process.env.GITHUB_WORKSPACE}/node_modules/@actions/github`);

const COMMENT_ANCHOR = "dependabot_test";

module.exports = async (github, context, core, token) => {
  try {
    console.log("token", token);
    console.log("context", context);

    const octokit = actionsGithub.getOctokit(token);

    // Find comment id if exist
    const { data: existingComments } = await octokit.rest.issues.listComments({
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
      await octokit.rest.issues.createComment({
        issue_number: prNumber,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: commentBody,
      });
    } else {
      console.log("Updating comment...", commentId);
      await octokit.rest.issues.updateComment({
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