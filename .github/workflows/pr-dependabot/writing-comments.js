const {
  getPrInfo,
  readFileFromArtifact,
} = require("./utils");

const COMMENT_ANCHOR = "dependabot_comments";

module.exports = async (github, context, core, commitHash, workflow) => {
  try {
    const fileData = readFileFromArtifact();

    const prInfo = await getPrInfo(github, context, core, commitHash);
    const prNumber = prInfo.number;

    console.log("prNumber", prNumber);
    console.log("data", fileData);
    console.log("context", context);
    // TODO: check whether we can detect the event actor is dependabot
    console.log("workflow", workflow);

    // Find comment id if exist
    const { data: existingComments } = await github.issues.listComments({
      issue_number: prNumber,
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

    const commentBody = `${fileData} (${commitHash}) <sub>${COMMENT_ANCHOR}</sub>`;
    if (!commentId) {
      console.log("Creating comment...");
      await github.issues.createComment({
        issue_number: prNumber,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: commentBody,
      });
    } else {
      console.log("Updating comment...", commentId);
      await github.issues.updateComment({
        comment_id: commentId,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: commentBody,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};
