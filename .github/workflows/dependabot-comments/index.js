const {
  getPrInfo,
  readFileFromArtifact,
} = require("./utils");

const COMMENT_ANCHOR = "dependabot_comments";

// Allowing contributor AND dependabot to write comments to a pull request
module.exports = async (github, context, core, commitHash) => {
  try {
    const firstFileData = readFileFromArtifact("first-data-arctifact");
    const secondFileData = readFileFromArtifact("second-data-arctifact");
    const fileData = firstFileData.concat(secondFileData);

    // In `workflow_run` event, regardless the actor is dependabot or not,
    // we can't retrieve pr number from `context.issue`
    // { owner: 'marilyn79218', repo: 'react-lazy-show', number: undefined }
    // console.log("context issue", context.issue);

    const prInfo = await getPrInfo(github, context, core, commitHash);
    const prNumber = prInfo.number;

    console.log("prNumber", prNumber);
    console.log("context", context);

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
