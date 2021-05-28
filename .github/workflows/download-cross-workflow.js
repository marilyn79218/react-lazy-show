// @noflow
const fs = require("fs");
const path = require("path");

const actifactFolderPath = path.join(process.cwd());
fs.readdirSync(actifactFolderPath, "utf-8").forEach(file => {
  if (file.endsWith(".txt")) {
    console.log("file", file);

    const rawFileData = fs.readFileSync(path.join(actifactFolderPath, file), "utf-8");
    console.log("rawFileData", rawFileData);

    const fileData = JSON.parse(rawFileData);
    console.log("fileData: ", fileData);
  }
});