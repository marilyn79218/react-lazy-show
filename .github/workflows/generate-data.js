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

  // In pull_request event, we can retrieve pr number from `context.issue`
  console.log("context issue", context.issue);
  console.log("context number", context.issue.number);
}
