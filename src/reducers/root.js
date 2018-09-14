import { combineReducers } from 'redux';
import {
  REQUEST_AUTH,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_CANCEL
} from '../actions/auth';
import {
  REQUEST_JOBS,
  REQUEST_ERROR,
  RECEIVE_JOBS
} from '../actions/job';
import {
  SET_JOB_FILTER,
  SHOW_MENU,
  HIDE_MENU,
  SET_LOGIN_VIDEO,
  SHOW_CONFIRM,
  HIDE_CONFIRM,
  TOGGLE_MANUAL
} from '../actions/ui';


const defaultState = {
  auth: {
    isLogging: false,
    isAuth: false,
    error: false,
    data: '',
    name: ''
  },
  job: {
    error: false,
    isFetching: false,
    jobs: [],
    mode: 'active',
  },
  ui: {
    jobFilter: 'user',
    firstFetch: true,
    loginVideo: null,
    menuTarget: null,
    menuType: 'nav',
    menuShow: false,
    confirmShow: false,
    confirmType: {name:'unsigned', action: null},
    manualShow: false,
  },
};


const ui = (state=defaultState.ui, action) => {
  switch (action.type) {
    case SET_JOB_FILTER:
      return {...state, jobFilter: action.filter};
    case RECEIVE_JOBS:
      return {...state, firstFetch: false};
    case SHOW_MENU:
      return {...state, menuTarget: action.menuTarget, menuType: action.menuType, menuShow: true};
    case HIDE_MENU:
      return {...state, menuShow: false};
    case SET_LOGIN_VIDEO:
      return {...state, loginVideo: action.video};
    case SHOW_CONFIRM:
      return {...state, confirmType: action.confirmType, confirmShow: true};
    case HIDE_CONFIRM:
      return {...state, confirmShow: false};
    case TOGGLE_MANUAL:
      return {...state, manualShow: !state.manualShow};
    default:
      return state;
  }
};


const auth = (state=defaultState.auth, action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return {...state, isLogging: true};
    case AUTH_ERROR:
      return {...state, isLogging: false, error: true};
    case AUTH_SUCCESS:
      return {...state, isLogging: false, isAuth: true, ...action.info};
    case AUTH_CANCEL:
      return {...state, isAuth: false, error: false};
    default:
      return state;
  }
};


const job = (state=defaultState.job, action) => {
  switch (action.type) {
    case REQUEST_JOBS:
      return {...state, isFetching: true};
    case REQUEST_ERROR:
      return {...state, isFetching: false, error: true};
    case RECEIVE_JOBS:
      return {...state, isFetching: false, error: false, jobs: action.jobs};
    default:
      return state;
  }
}


const appReducer = combineReducers({
  auth,
  job,
  ui
});


const rootReducer = (state, action) => {
  if (action.type === AUTH_CANCEL) {
    state = undefined;
  }

  return appReducer(state, action);
}


export default rootReducer;