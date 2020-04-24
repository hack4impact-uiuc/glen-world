export const getDeploymentAccountIdsFromLesson = lesson => {
  let deploymentAccountIds = new Set();
  Object.values(lesson.dueDates).forEach(assignedDeploymentIds =>
    assignedDeploymentIds.forEach(deploymentAccount =>
      deploymentAccountIds.add(deploymentAccount)
    )
  );

  return Array.from(deploymentAccountIds);
};
