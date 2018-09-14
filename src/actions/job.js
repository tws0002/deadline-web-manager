import fetch from 'cross-fetch';
import serverURL from '../config/serverURL';


export const REQUEST_JOBS = 'REQUEST_JOBS';
const requestJobs = () => {
  return {
    type: REQUEST_JOBS
  }
};


export const REQUEST_ERROR = 'REQUEST_ERROR';
const requestError = () => {
  return {
    type: REQUEST_ERROR,
  }
};


export const RECEIVE_JOBS = 'RECEIVE_JOBS';
const receiveJobs = jobs => {
  return {
    type: RECEIVE_JOBS,
    jobs
  }
};


// action creators
export const fetchJobs = () => {
  return (dispatch, getState) => {
    if (getState().job.isFetching) return;
    dispatch(requestJobs());

    const name = getState().auth.name;

    return fetch(serverURL + `jobs?username=${name}`, {
        headers: {'authorization': getState().auth.data}
      }).then(res => {
        if (res.status === 200){
          return res.json();
        }else{
          return false;
        }
      }).then(data => {
        if (data) {
          dispatch(receiveJobs(data));
        }else{
          dispatch(requestError());
        }
      });
  }
}

export const operateJob = () => {
  return (dispatch, getState) => {
    dispatch(requestJobs());
    
    const id = getState().ui.menuType.id;
    const action = getState().ui.confirmType;

    return fetch(serverURL + `job?id=${id}&action=${action}`, {
        headers: {'authorization': getState().auth.data}
      }).then(res => {
        if (res.status === 200){
          return res.json();
        }else{
          return false;
        }
      }).then(data => {
        if (data) {
          const jobs = getState().job.jobs;
          let newJobs;
          if (data.delete === true){
            newJobs = jobs.filter(job => job.id !== id);
          }else{
            newJobs = jobs.map(job => {
              if (job.id === id){
                return data
              }else{
                return job
              }
            })
          }
          dispatch(receiveJobs(newJobs));
        }else{
          dispatch(requestError());
        }
      });
  }
}