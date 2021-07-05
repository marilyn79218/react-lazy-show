// It's a testing script to test dependabot writing permission
// Should be removed once the test done.

const COMMENT_ANCHOR = "dependabot_auth_myself";

module.exports = async (github, context, core, octokit) => {
  try {
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

    const {
      actor,
      payload: { after: commitId },
    } = context;
    const commentBody = `${COMMENT_ANCHOR}: ${actor} - ${commitId}`;
    if (!commentId) {
      console.log("Creating comment...");
      await octokit.rest.issues.createComment({
        issue_number: context.issue.number,
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