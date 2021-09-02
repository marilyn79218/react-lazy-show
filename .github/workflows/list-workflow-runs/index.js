// See how to use this script at here
// Ref: https://github.com/marilyn79218/react-lazy-show/pull/81/files#diff-791e06a00e373dcb530ab45bfc3ed3f9a576b7e4b6edf75e9aef08fe1251d2faR80
// Or specify `workflowId` as `workflow-run.yml` which is the workflow filename
// Ref: https://octokit.github.io/rest.js/v18#actions-list-workflow-runs

module.exports = async (github, context, core, workflowId) => {
  try {
    console.log("workflowId", workflowId);

    // API doc: https://octokit.github.io/rest.js/v18#actions-list-workflow-runs
    // List of status & conclusion values
    //    Ref 1: https://docs.github.com/en/rest/reference/checks#check-runs
    //    Ref 2: https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#webhook-payload-object
    // Code example: https://github.com/dawidd6/action-download-artifact/blob/master/main.js#L60
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

    // [Things learned]
    // listWorkflowRuns() API returns all the workflows that matches ALL the status & conclusions you specify.

    // The conclusion of a workflow is "the highest priority check run conclusion in the check suite's conclusion".
    // Or you can say it is "The summary conclusion for all check runs that are part of the check suite"
    // For example, if three check runs have conclusions of "timed_out", "success", and "neutral",
    // then the check suite conclusion will be timed_out.

    // Note: the priority of check run conclusion is
    // "action_required", "cancelled", "timed_out", "failure", "neutral", and "success"
    // Ref: https://docs.github.com/en/rest/guides/getting-started-with-the-checks-api#about-check-suites
    // Ref: https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#check_suite

    // For example, from my observation,
    // if you specify status "completed,failure" in this API,
    // it returns all the workflows that are in "completed" status and "failure" conclusion,
    // which means the workflow is "completed" but one of its job has "failure" conclusion.

    // In another point of view, if a run has "completed" status and "failure" conclusion,
    // then it will only be returned if you specify below status combinations in listWorkflowRuns() API:
    // 1. Query without status param
    // 2. Query with status value "failure"
    // 3. Query with status value "completed"
    // 4. Query with status value "completed,failure"





    // ------------- Log for testing this listWorkflowRuns API behaviors -------------

    // How to run them? Uncomment and execute them in workflow-run.yml
    // Or you can simply see the logs in the "Display workflow info" section of the CI hashboard
    // It shows you the status and conclusion when the "workflow_run" event is triggered
    // Ref: https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_run

    // The number of returned workflow runs in this case is > 0
    // console.log("Failure status ---------------------------------------");
    // runs = await github.actions.listWorkflowRuns({
    //   owner: context.repo.owner,
    //   repo: context.repo.repo,
    //   workflow_id: workflowId,
    //   status: "failure",
    // });
    // console.log("Failure runs", runs)
    // for (const run of runs.data.workflow_runs) {
    //   console.log("run", run);
    // }

    // The number of returned workflow runs in this case is > 0
    // console.log("Success status ---------------------------------------");
    // runs = await github.actions.listWorkflowRuns({
    //   owner: context.repo.owner,
    //   repo: context.repo.repo,
    //   workflow_id: workflowId,
    //   status: "success",
    // });
    // console.log("Success runs", runs)
    // for (const run of runs.data.workflow_runs) {
    //   console.log("run", run);
    // }

    // The number of returned workflow runs in this case is > 0
    // console.log("Completed status ---------------------------------------");
    // runs = await github.actions.listWorkflowRuns({
    //   owner: context.repo.owner,
    //   repo: context.repo.repo,
    //   workflow_id: workflowId,
    //   status: "completed",
    // });
    // console.log("Completed runs", runs)
    // for (const run of runs.data.workflow_runs) {
    //   console.log("run", run);
    // }

    // The number of returned workflow runs in this case is > 0
    // console.log("Complete & failure status ---------------------------------------");
    // runs = await github.actions.listWorkflowRuns({
    //   owner: context.repo.owner,
    //   repo: context.repo.repo,
    //   workflow_id: workflowId,
    //   status: "completed,failure",
    // });
    // console.log("Completed & failure runs", runs);
    // for (const run of runs.data.workflow_runs) {
    //   console.log("run", run);
    // }

    // The number of returned workflow runs in this case is > 0
    // console.log("Complete & success status ---------------------------------------");
    // runs = await github.actions.listWorkflowRuns({
    //   owner: context.repo.owner,
    //   repo: context.repo.repo,
    //   workflow_id: workflowId,
    //   status: "completed,success",
    // });
    // console.log("Completed & success runs", runs);
    // for (const run of runs.data.workflow_runs) {
    //   console.log("run", run);
    // }

    // The number of returned workflow runs in this case is === 0
    // console.log("Success & failure status ---------------------------------------");
    // runs = await github.actions.listWorkflowRuns({
    //   owner: context.repo.owner,
    //   repo: context.repo.repo,
    //   workflow_id: workflowId,
    //   status: "success,failure",
    // });
    // console.log("Success & failure runs", runs);
    // for (const run of runs.data.workflow_runs) {
    //   console.log("run", run);
    // }
  } catch (error) {
    core.setFailed(error.message);
  }
};
