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
const readFileFromArtifact = filename => {
  console.log("filename", filename);
  try {
    let fileData;
    const actifactFolderPath = path.join(process.cwd());
    console.log("actifact path", actifactFolderPath);
    fs.readdirSync(actifactFolderPath, "utf-8").forEach(file => {
      console.log("file", file);

      if (file.endsWith(".txt") && file === filename) {
        console.log("txt file", file);
        const rawFileData = fs.readFileSync(
          path.join(actifactFolderPath, file),
          "utf-8",
        );
        console.log("txt file - raw file data", rawFileData);
        fileData = JSON.parse(rawFileData);
        console.log("txt file - file data", fileData);
      }
    });

    console.log("file data", fileData);
    return fileData;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getPrInfo,
  readFileFromArtifact,
};