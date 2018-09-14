import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button';


const LoginForm = props => {
  const { disable, error, onLogin, manual, ...others } = props;

  const disableClass = disable ? ' disabled' : '';

  const handleSubmit = event => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    onLogin(username, password);
  }


  return (
    <form className='form' onSubmit={handleSubmit} {...others}>
      <div className='manual-link' onClick={manual}>
        <HelpOutline fontSize='inherit'/>
        登入說明
      </div>
      <div className={'field' + disableClass}>
        <input type="text" id='username' name="username" placeholder="Username" autoComplete="username" autoCapitalize="none" autoCorrect="off" disabled={disable} />
        <Person fontSize='inherit' />
      </div>
      <div className='field'>
        <input type="password" id='password' name="password" placeholder="Password" autoComplete="current-password" disabled={disable} />
        <Lock fontSize='inherit' />
      </div>
      <Button type="submit" variant="outlined" className='button' disabled={disable}>
        {disable ?
          <CircularProgress className='progress' color="inherit" size={30} /> :
          'Sign In'
        }
      </Button>
      {error && <div className='error'>Login Error!</div>}
    </form>
  )
};

export default LoginForm;