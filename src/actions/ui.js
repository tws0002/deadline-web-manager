import { randomVideo } from '../config/loginVideo'


export const SET_JOB_FILTER = 'SET_JOB_FILTER';
export const setJobFilter = filter => {
  return {
    type: SET_JOB_FILTER,
    filter
  }
};


export const SHOW_MENU = 'SHOW_MENU';
const showMenu = (menuTarget, menuType) => {
  return {
    type: SHOW_MENU,
    menuTarget,
    menuType
  }
};


export const HIDE_MENU = 'HIDE_MENU';
const hideMenu = () => {
  return {
    type: HIDE_MENU,
  }
};


export const SET_LOGIN_VIDEO = 'RANDOM_VIDEO';
const setLoginVideo = video => {
  return {
    type: SET_LOGIN_VIDEO,
    video
  }
};


export const SHOW_CONFIRM = 'SHOW_CONFIRM';
const showConfirm = confirmType => {
  return {
    type: SHOW_CONFIRM,
    confirmType
  }
};


export const HIDE_CONFIRM = 'HIDE_CONFIRM';
const hideConfirm = () => {
  return {
    type: HIDE_CONFIRM,
  }
};


export const TOGGLE_MANUAL = 'TOGGLE_MANUAL';
export const toggleManual = () =>{
  return {
    type: TOGGLE_MANUAL,
  }
}


// action creators
export const drawVideo = () => {
  return dispatch => {
    const video = randomVideo();
    dispatch(setLoginVideo(video));
  };
};


export const toggleMenu = (menuTarget, menuType) => {
  return dispatch => {
    if (menuTarget){
      dispatch(showMenu(menuTarget, menuType));
    }else{
      dispatch(hideMenu());
    }
  };
}


export const toggleConfirm = (confirmType) => {
  return dispatch => {
    if (confirmType){
      dispatch(showConfirm(confirmType));
    }else{
      dispatch(hideConfirm());
    }
  };
}