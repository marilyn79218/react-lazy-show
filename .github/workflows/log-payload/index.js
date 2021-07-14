

module.exports = async (github, context, core, workflowRun) => {
  try {
    console.log("workflow run", typeof workflowRun, JSON.parse(workflowRun));

    if (workflowRun && workflowRun.pull_requests) {
      workflowRun.pull_requests.forEach((pr, idx) => console.log(`pr ${idx}: `, pr));
    } else {
      console.log("No pr list");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}
