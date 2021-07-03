
module.exports = async (github, context, core, prList) => {
  prList.forEach((pr, idx) => {
    console.log(`PR ${idx}: ${pr}`);
  });
};

