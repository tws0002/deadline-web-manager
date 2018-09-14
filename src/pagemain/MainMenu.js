import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { getJobOrder } from '../config/jobTool';

const MainMenu = props => {
  const { target, show, close, items, itemOnClick, clicked, ...others } = props;

  return (
    <Menu
      id='menu'
      anchorEl={target}
      open={show}
      onClose={close}
      classes={{paper: 'container'}}
      {...others}
    >
      {items.map(item => {
        const menuItem = (
          <MenuItem onClick={() => itemOnClick(item.func)} key={item.text}>
            <item.icon />
            {item.text}
          </MenuItem>
        );
        if (item.filter) {
          const order = getJobOrder(clicked);
          if (item.filter.includes(order)){
            return menuItem;
          }else{
            return null;
          }
        }else{
          return menuItem;
        }
      })}
    </Menu>
  )
};

export default MainMenu;