import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import ExpandMore from '@material-ui/icons/ExpandMore';

const Nav = props => {
  const { tabValue, onTabChange, userLabel, onMenuClick, ...others } = props;

  return (
    <div className='nav resizer' {...others}>
      <Tabs value={tabValue} onChange={onTabChange} classes={{root:'tabs', indicator: 'tab-indicator'}}>
        <Tab label={userLabel} value='user' />
        <Tab label='ACTIVE' value='active' />
      </Tabs>
      <div className='tab-menu'>
        <IconButton onClick={onMenuClick}>
          <ExpandMore fontSize='inherit' />
        </IconButton>
      </div>
    </div>
  )
};

export default Nav;