import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const FetchProgress = props => {
  const { fetching, ...others } = props;

  const fetchValue = fetching ? 1 : 0;

  return (
    <div className='fetch-progress' {...others}>
      <div className='container'>
        <LinearProgress classes={{root: 'linear'}} style={{transform: `scale(${fetchValue})`}} />
      </div>
    </div>
  )
};

export default FetchProgress;