const fs = require("fs");
const path = require("path");

module.exports = async (github, context, core, filename) => {
  const data = [];
  for (let i=0; i<3; i++) {
    data.push(`idx: ${i} - time: ${new Date().toISOString()}`);
  };

  const fileContent = JSON.stringify(data);
  const filePath = path.join(process.cwd(), filename);

  fs.writeFileSync(filePath, fileContent);

  /* Logs block */
  console.log("github.event", github.event);

  // Error: Cannot read property 'workflow_run' of undefined
  // const workflowRunHash = github.event.workflow_run.head_sha;
  // console.log("workflow run - hash", workflowRunHash);

  const githubHash = github.sha;
  console.log("github - hash", githubHash);

  const envHash = process.env.GITHUB_SHA;
  console.log("env - hash", envHash);
  /* Logs block */
}
