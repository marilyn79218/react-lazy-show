module.exports = async (github, context, core, workflowId) => {
  try {
    console.log("workflowId", workflowId);

    console.log("No status ---------------------------------------");
    let runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: workflowId,
    });
    console.log("runs", runs)
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Failure status ---------------------------------------");
    runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: workflowId,
      status: "failure",
    });
    console.log("Failure runs", runs)
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Success status ---------------------------------------");
    runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: workflowId,
      status: "success",
    });
    console.log("Success runs", runs)
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Completed status ---------------------------------------");
    runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: workflowId,
      status: "completed",
    });
    console.log("Completed runs", runs)
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Complete & failure status ---------------------------------------");
    runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: workflowId,
      status: "completed,failure",
    });
    console.log("Completed & failure runs", runs);
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Complete & success status ---------------------------------------");
    runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: workflowId,
      status: "completed,success",
    });
    console.log("Completed & success runs", runs);
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Success & failure status ---------------------------------------");
    runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: workflowId,
      status: "success,failure",
    });
    console.log("Success & failure runs", runs);
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};
