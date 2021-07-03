
// It's a testing script to test dependabot writing permission
// Should be removed once the test done.
module.exports = async (github, context, core) => {
  try {
    // Find comment id if exist
    const { data: existingComments } = await github.issues.listComments({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    let commentId;
    for (let i = existingComments.length; i--; ) {
      const c = existingComments[i];
      if (c.user.type === "Bot" && c.body.includes(commentTitle)) {
        commentId = c.id;
        break;
      }
    }

    const timestamp = Date.now();
    if (!commentId) {
      console.log("Creating comment...");
      await github.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: timestamp,
      });
    } else {
      console.log("Updating comment...", commentId);
      await github.issues.updateComment({
        comment_id: commentId,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: timestamp,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}