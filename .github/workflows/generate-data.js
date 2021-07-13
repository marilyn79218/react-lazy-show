const fs = require("fs");
const path = require("path");

module.exports = async (github, context, core, filename) => {
  const fileContent = JSON.stringify({
    map: {
      filename,
      a: "Abc",
      b: "aBc",
      c: "abC"
    }
  });

  const filePath = path.join(process.cwd(), filename);

  fs.writeFileSync(filePath, fileContent);
}
