import React from 'react';
import { getPoolName, getStatusName } from './config/jobTool';

import Person from '@material-ui/icons/Person';
import MoreVert from '@material-ui/icons/MoreVert';

import { toggleMenu } from './actions/ui';

import './jobitem/JobItem.css'
import Widgets from './jobitem/Widgets';
import PluginIcon from './jobitem/PluginIcon'
import Progress from './jobitem/Progress'


const JobMenu = props => {
  return (
    <MoreVert fontSize='inherit'  {...props}/>
  )
}


const JobItem = props => {
  const { job, username, dispatch } = props;

  const jobStatus = ' ' + getStatusName(job, false).toLowerCase();
  const own = username === job.user || username === 'elisha';

  return (
    <div className={'job-item' + jobStatus}>
      <div className='container'>
        <div className='content'>
          <div className='top'>
            <PluginIcon plugin={job.plugin} className='plugin-logo' />
            <div className='title'>
              {job.name}
            </div>
            {own && <JobMenu onClick={event => dispatch(toggleMenu(event.currentTarget, job))} />}
          </div>
          <div className='sub-content'>
            <div className='left-area'>
              <div className='user-info'>
                <Person fontSize='inherit' />
                {job.user}
              </div>
              <Widgets className='widgets' job={job} />
            </div>
            <div className='right-area'>
              <div className='priority'>
                {job.priority}
              </div>
              <div className='pool'>
                {getPoolName(job.pool)}
              </div>
            </div>
          </div>
        </div>
        <Progress job={job} />
      </div>
    </div>
  );
};


export default JobItem;