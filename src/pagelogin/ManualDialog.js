import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const ManualDialog = props => {
  const { show, close, ...others } = props;

  return (
    <Dialog
      fullWidth
      scroll='paper'
      open={show}
      onClose={close}
      classes={{paper: 'paper', root: 'root'}}
      {...others}
    >
      <DialogContent>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
        <div>
          <img src='https://i.imgur.com/BVUc8Kq.png' alt='點兩下執行Deadline Monitor' />
          點兩下執行 <span>Deadline Monitor</span> 。
        </div>
        <div>
          <img src='https://i.imgur.com/oSHA4vI.png' alt='上面選單Tools選擇Options' />
          上面選單 <span>Tools</span> 選擇 <span>Options</span> 。
        </div>
        <div>
          <img src='https://i.imgur.com/RMlblto.png' alt='上面選單Tools選擇Options' />
          選擇 <span>User Settings</span>，找到 <span>Web Service Password</span> 填上自訂密碼 (下面再填一遍重複確認)，用戶名稱即是 <span>Render As User</span> 那欄 (這邊是 <span>Higher</span>)。
        </div>
      </DialogContent>
    </Dialog>
  )
};

export default ManualDialog;