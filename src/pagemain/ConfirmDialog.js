import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const ConfirmDialog = props => {
  const { show, close, jobName, actionName, onCancel, onConfirm, ...others } = props;

  return (
    <Dialog
      id='dialog'
      open={show}
      onClose={close}
      classes={{paper: 'paper', root: 'root'}}
      {...others}
    >
      <DialogTitle>{jobName}</DialogTitle>
      <DialogContent>
        Are you sure you want to <span className='action'>{actionName}</span> this job?
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default ConfirmDialog;