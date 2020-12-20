const path = require("path");
const {
  bundlesizeDesktop,
  bundlesizeMobile,
} = require("../../scripts/bundlesize");

console.log("(github script) current path 1", path.resolve(__dirname));

module.exports = () => {
  console.log("(github script) current path 2", path.resolve(__dirname));
};
