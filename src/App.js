import React from 'react';
import './font.css';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Switcher from './Switcher';


const App = () => {
  return (
    <div className='app-root'>
      <CssBaseline />
      <Switcher />
    </div>
  );
}

export default App;
