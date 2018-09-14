export const getPoolName = pool => {
  let text;
  switch (pool) {
    case '1---less_than_15minutes':
      text = '< 15mins';
      break;
    case '2---about_30minutes':
      text = '≈ 30mins';
      break;
    case '3---about_90minutes':
      text = '≈ 1.5hours';
      break;
    case '4---more_than_120minutes':
      text = '> 2hours';
      break;
    default:
      text = 'unknown';
  }

  return text;
};

export const getStatusName = (job, percent=true) => {
  let text;
  if (job.renderingTasks > 0){
    if (percent){
      if (job.renderingTasks === 1) {
        text = job.singleProgress;
      }else{
        text = Math.floor(job.completedTasks / job.taskCount * 100) + '%';
      }
    }else{
      text = 'Rendering';
    }
  }else if (job.queuedTasks > 0){
    text = 'Queued';
  }else{
    text = job.status;
  }

  return text;
};

export const getJobOrder = job => {
  if (job.renderingTasks > 0){
    return 0;
  }else if (job.queuedTasks > 0){
    return 1;
  }
  switch (job.status) {
    case 'Pending':
      return 2;
    case 'Completed':
      return 3;
    case 'Suspended':
      return 4;
    case 'Failed':
      return 5;
    default:
      return 6;
  }
}

export const compareActiveJobs = (a, b) => {
  const aOrder = getJobOrder(a);
  const bOrder = getJobOrder(b);
  if (aOrder !== bOrder){
    return aOrder - bOrder;
  }else{
    if (aOrder <= 3){
      const aPriority = a.priority;
      const bPriority = b.priority;
      if (aPriority !== bPriority){
        return bPriority - aPriority;
      }
    }
    const aDate = Date.parse(a.submitDate);
    const bDate = Date.parse(b.submitDate);
    return bDate - aDate;
  }
};

export const compareUserJobs = (a, b) => {
  const aOrder = getJobOrder(a);
  const bOrder = getJobOrder(b);
  if ((aOrder < 3 || bOrder < 3) && aOrder !== bOrder){
    return aOrder - bOrder;
  }else{
    const aDate = Date.parse(a.submitDate);
    const bDate = Date.parse(b.submitDate);
    return bDate - aDate;
  }
};