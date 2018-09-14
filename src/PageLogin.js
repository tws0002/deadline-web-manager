import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions/auth';

import { drawVideo, toggleManual } from './actions/ui'
import msLogo from './source/image/msLogo.png';

import './pagelogin/PageLogin.css';
import BackgroundVideo from './pagelogin/BackgroundVideo';
import LoginForm from './pagelogin/LoginForm';
import ManualDialog from './pagelogin/ManualDialog';


const PageLogin = props => {
  const {auth, ui, dispatch} = props;

  if (!ui.loginVideo) {
    dispatch(drawVideo());
  }

  const handleLogin = (username, password) => {
    if (username + password !== ''){
      dispatch(login(username, password));
    }
  }

  const handleManual = () => {
    dispatch(toggleManual())
  }

  return (
    <div className='page-login'>
      <BackgroundVideo className='background-video' url={ui.loginVideo} />
      <div className='layout'>
        <img className='logo' src={msLogo} alt='moonshine logo' />
        <div className='header'>
          Render Farm
        </div>
        <LoginForm
          disable={auth.isLogging}
          error={auth.error}
          onLogin={handleLogin}
          manual={handleManual}
        />
      </div>
      <ManualDialog
        show={ui.manualShow}
        close={handleManual}
        id='manual'
      />
    </div>
  );
}


const mapStateToProps = state => {
    return {
      auth: state.auth,
      ui: state.ui
    };
};


export default connect(mapStateToProps)(PageLogin);