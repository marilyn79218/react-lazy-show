// @noflow
const fs = require("fs");
const path = require("path");

// Background (A) -
// 如果 "upload-artifact@v2" 沒有設定 param "name"，則預設會使用 "artifact" 當作該 artifact name 做 upload。
// Ref: ref: https://github.com/actions/upload-artifact#uploading-without-an-artifact-name

// Background (B) -
// 當 "download-artifact@v2" 沒有設定 param "name"，
// 每個 artifact 都會分別被 downloaded 至自己專屬的 folder 底下，且該 folder 會被以那個 artifact name 命名。
// Ref: https://github.com/actions/download-artifact#download-all-artifacts

// Case 1:
// 綜合 (A) & (B), 我們的 actifact 路徑為 project_root_directory/artifact
// const actifactFolderPath = path.join(process.cwd(), "artifact");

// Case 2:
// 如果今天 "upload-artifact@v2" 有設定 name 為 "uploaded-artifact"
// 則我們的 actifact 路徑為 project_root_directory/uploaded-artifact
const actifactFolderPath = path.join(process.cwd(), "uploaded-artifact");

fs.readdirSync(actifactFolderPath, "utf-8").forEach(file => {
  if (file.endsWith(".txt")) {
    const rawFileData = fs.readFileSync(path.join(actifactFolderPath, file), "utf-8");
    const fileData = JSON.parse(rawFileData);

    console.log(fileData);
    console.log(Array.isArray(fileData), fileData[0], fileData[1], fileData[2]);
  }
});