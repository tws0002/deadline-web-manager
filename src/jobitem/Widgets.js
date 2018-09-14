import React from 'react';
import AccessTime from '@material-ui/icons/AccessTime';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';


const parseMsecs = msecs => {
  const secs = msecs / 1000;
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  let text = '';
  if (days > 0){
    text += days + 'd ';
  }
  if (hours > 0){
    text += (hours % 24) + 'h ';
  }
  if (mins > 0){
    text += (mins % 60) + 'm ';
  }
  if (secs < 60){
    text += Math.floor(secs) + 's';
  }

  return text;
}


const Widgets = props => {
  const { job, ...others } = props;

  let widgets = [];

  if (job.renderingTasks > 0) {
    const startDate = Date.parse(job.startDate);
    const nowDate = new Date();
    const timeDiff = nowDate - startDate;
    const renderTime = {
      id: 'render-time',
      icon: AccessTime,
      value: parseMsecs(timeDiff),
      header: 'render time'
    }
    widgets.push(renderTime)
  }else if (job.queuedTasks > 0 || job.pendingTasks > 0){
    const submitDate = Date.parse(job.submitDate);
    const nowDate = new Date();
    const timeDiff = nowDate - submitDate + 100000;
    const submitTime = {
      id: 'submit-date',
      icon: DateRange,
      value: parseMsecs(timeDiff) + ' ago',
      header: 'submit time'
    }
    widgets.push(submitTime)
  }else if (job.completedTasks === job.taskCount) {
    const startDate = Date.parse(job.startDate);
    const completedDate = Date.parse(job.completedDate);
    const timeDiff = completedDate - startDate;
    const renderTime = {
      id: 'render-time',
      icon: AccessTime,
      value: parseMsecs(timeDiff),
      header: 'render time'
    }
    widgets.push(renderTime)
  }

  if (job.errors > 0) {
    const errors = {
      id: 'errors',
      icon: Warning,
      value: job.errors,
      header: 'errors',
    }
    widgets.push(errors)
  }

  return (
    <div {...others}>
      {widgets.map(widget => 
        <div className={`widget ${widget.id}`} key={widget.id}>
          <div className='icon'>
            <widget.icon fontSize='inherit' />
          </div>
          <div className='content'>
            <div className='value'>
              {widget.value}
            </div>
            <div className='header'>
              {widget.header}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Widgets;