import { signOut } from '../actions/auth';
import { fetchJobs } from '../actions/job';
import { toggleConfirm } from '../actions/ui';

import Refresh from '@material-ui/icons/Refresh';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import Pause from '@material-ui/icons/Pause';
import Autorenew from '@material-ui/icons/Autorenew';
import Delete from '@material-ui/icons/Delete';
import RestorePage from '@material-ui/icons/RestorePage';
import PlayArrow from '@material-ui/icons/PlayArrow';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';


export const navMenuItems = [
  {
    func: fetchJobs,
    icon: Autorenew,
    text: 'Refresh'
  },
  {
    func: signOut,
    icon: RemoveCircleOutline,
    text: 'Sign Out'
  }
];

export const jobMenuItems = [
  {
    func: () => toggleConfirm('resume'),
    icon: PlayArrow,
    text: 'Resume',
    filter: [4]
  },
  {
    func: () => toggleConfirm('resumefailed'),
    icon: PlayArrow,
    text: 'Resume Failed',
    filter: [5]
  },
  {
    func: () => toggleConfirm('suspend'),
    icon: Pause,
    text: 'Suspend',
    filter: [0, 1, 2]
  },
  {
    func: () => toggleConfirm('requeue'),
    icon: Refresh,
    text: 'Requeue',
    filter: [0, 3]
  },
  {
    func: () => toggleConfirm('resubmit'),
    icon: RestorePage,
    text: 'Resubmit',
    filter: [0, 1, 2, 3, 4, 5]
  },
  {
    func: () => toggleConfirm('complete'),
    icon: CheckCircleOutline,
    text: 'Complete',
    filter: [0, 1, 2, 4, 5]
  },
  {
    func: () => toggleConfirm('delete'),
    icon: Delete,
    text: 'Delete',
    filter: [0, 1, 2, 3, 4, 5]
  },
];