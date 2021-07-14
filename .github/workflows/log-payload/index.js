

module.exports = async (github, context, core, workflowRun) => {
  try {
    console.log("workflow run", typeof workflowRun, workflowRun);
    console.log("workflow run (parsed)", JSON.parse(workflowRun));

    if (workflowRun && workflowRun.pull_requests) {
      workflowRun.pull_requests.forEach((pr, idx) => console.log(`pr ${idx}: `, pr));
    } else {
      console.log("No pr list");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}
