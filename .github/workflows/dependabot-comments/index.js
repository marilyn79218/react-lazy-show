const {
  getPrInfo,
  readFileFromArtifact,
} = require("./utils");

const COMMENT_ANCHOR = "dependabot_comments";

// Allowing contributor AND dependabot to write comments to a pull request
module.exports = async (github, context, core, commitHash, workflowName) => {
  try {
    const firstFileData = readFileFromArtifact("first-data-arctifact");
    const secondFileData = readFileFromArtifact("second-data-arctifact");
    const fileData = firstFileData.concat(secondFileData);

    let prNumber;
    switch (workflowName) {
      case "workflow_run": {
        // In `workflow_run` event, regardless the actor is dependabot or not,
        // we can't retrieve pr number from `context.issue`
        // { owner: 'marilyn79218', repo: 'react-lazy-show', number: undefined }
        // console.log("context issue", context.issue);

        const prInfo = await getPrInfo(github, context, core, commitHash);
        prNumber = prInfo.number;
        break;
      }
      case "pr": {
        prNumber = context.issue.number;
        break;
      }
    }

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

    core.setOutput(
      "gsheetCommands",
      JSON.stringify([
        {
          command: "getWorksheet",
          args: { worksheetTitle: "PR Comments" },
        },
        {
          command: "appendData",
          args: {
            data: [
              [
                new Date().toISOString(),
                prNumber,
                commitHash,
                commentBody,
              ],
            ],
            minCol: 1,
          },
        },
      ]),
    );
  } catch (error) {
    core.setFailed(error.message);
  }
};
