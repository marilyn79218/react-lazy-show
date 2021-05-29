// @noflow
const fs = require("fs");
const path = require("path");

const actifactFolderPath = path.join(process.cwd());
fs.readdirSync(actifactFolderPath, "utf-8").forEach(file => {
  if (file.endsWith(".txt")) {
    const rawFileData = fs.readFileSync(path.join(actifactFolderPath, file), "utf-8");
    const fileData = JSON.parse(rawFileData);

    console.log(fileData);
    console.log(Array.isArray(fileData), fileData[0], fileData[1], fileData[2]);
  }
});

