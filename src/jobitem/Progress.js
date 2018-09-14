import React from 'react';
import { VelocityComponent } from 'velocity-react';
import { getStatusName } from '../config/jobTool';

const Progress = props => {
  const { job } = props;
  const taskTypes = ['completed', 'rendering', 'failed', 'pending', 'suspended'];

  return (
    <div className='progress'>
      <div className='bar'>
      {taskTypes.map( taskType =>
        job[`${taskType}Tasks`] === 0 ?
          null :
          <VelocityComponent
            runOnMount
            animation={{width: job[`${taskType}Tasks`]/job.taskCount*100 + '%'}}
            duration={800}
            key={taskType}
          >
            <div
              className={`seg ${taskType}`}
            />
          </VelocityComponent>
      )}
      </div>
      <div className='status'>
        <div className='first-frame'>
          {job.firstFrame}
        </div>
        <div className='status-text'>
          {getStatusName(job).toUpperCase()}
        </div>
        <div className='last-frame'>
          {job.lastFrame}
        </div>
      </div>
    </div>
  );
};

export default Progress;