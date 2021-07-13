// @noflow
const fs = require("fs");
const path = require("path");

const getPrInfo = async (github, context, core, commitHash) => {
  const hash = commitHash || process.env.GITHUB_SHA;

  // Get PR associated with commit hash
  const listPrResponse = await github.repos.listPullRequestsAssociatedWithCommit(
    {
      owner: context.repo.owner,
      repo: context.repo.repo,
      commit_sha: hash,
    },
  );

  if (listPrResponse.data.length === 0) {
    // Should not happen, since all our commits to master are via merged PRs.
    console.log("Commit hash not associated with any PR");
    return;
  }
  
  const prInfo = listPrResponse.data[0];
  return prInfo;
};

// Read artifact content that was uploaded in previous action
const readFileFromArtifact = artifactName => {
  try {
    let fileData;
    const actifactFolderPath = path.join(process.cwd(), artifactName);
    fs.readdirSync(actifactFolderPath, "utf-8").forEach(file => {
      if (file.endsWith(".txt")) {
        const rawFileData = fs.readFileSync(
          path.join(actifactFolderPath, file),
          "utf-8",
        );
        fileData = JSON.parse(rawFileData);
      }
    });

    return fileData;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getPrInfo,
  readFileFromArtifact,
};