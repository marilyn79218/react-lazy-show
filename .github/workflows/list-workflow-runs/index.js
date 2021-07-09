module.exports = async (github, context, core) => {
  try {
    console.log("No status ---------------------------------------");
    let runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: github.event.workflow.id,
    });
    console.log("runs", runs)
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Failure status ---------------------------------------");
    let runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: github.event.workflow.id,
      status: "failure",
    });
    console.log("Failure runs", runs)
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Success status ---------------------------------------");
    let runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: github.event.workflow.id,
      status: "success",
    });
    console.log("Success runs", runs)
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Completed status ---------------------------------------");
    let runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: github.event.workflow.id,
      status: "completed",
    });
    console.log("Completed runs", runs)
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Complete & failure status ---------------------------------------");
    let runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: github.event.workflow.id,
      status: "completed,failure",
    });
    console.log("Completed & failure runs", runs);
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Complete & success status ---------------------------------------");
    let runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: github.event.workflow.id,
      status: "completed,success",
    });
    console.log("Completed & success runs", runs);
    for (const run of runs.data.workflow_runs) {
      console.log("run", run);
    }

    console.log("Success & failure status ---------------------------------------");
    let runs = await github.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: github.event.workflow.id,
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
