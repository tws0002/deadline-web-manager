import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import JobItem from '../JobItem';

const JobList = props => {
  const { jobs, sort, dispatch, username, ...others } = props;

  return (
    <Scrollbars
      autoHide
      className='job-list'
      renderThumbVertical={props => <div {...props} className="scroll-thumb"/>}
      renderView={props => <div {...props} className="scroll-view"/>}
      {...others}
    >
      <div className='container'>
        <div className='flex resizer'>
          {jobs
            .sort(sort)
            .map(job => 
            <JobItem key={job.id} job={job} dispatch={dispatch} username={username} />
          )}
          <div className='footer'>
          </div>
        </div>
      </div>
    </Scrollbars>
  )
};

export default JobList;