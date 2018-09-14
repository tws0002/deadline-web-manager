import React, { Component } from 'react';
import { connect } from 'react-redux';

import { compareUserJobs, compareActiveJobs } from './config/jobTool';

import { fetchJobs, operateJob } from './actions/job';
import { setJobFilter, toggleMenu, toggleConfirm } from './actions/ui';

import './pagemain/PageMain.css';
import Nav from './pagemain/Nav';
import MainMenu from './pagemain/MainMenu';
import ConfirmDialog from './pagemain/ConfirmDialog';
import FetchProgress from './pagemain/FetchProgress';
import JobList from './pagemain/JobList';
import { navMenuItems, jobMenuItems } from './pagemain/menuItems';


class PageMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.interval = setInterval(this.refreshJobs, 60000)
  }

  componentDidMount() {
    this.refreshJobs();
  }

  refreshJobs = () => {
    this.props.dispatch(fetchJobs());
  }

  handleTabChange = (event, value) => {
    this.props.dispatch(setJobFilter(value));
  }

  filterJobs = job => {
    if (this.props.ui.jobFilter === 'active'){
      return job.status === 'Active' || job.status === 'Pending';
    }else{
      return job.user === this.props.username;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleMenuClick = action => {
    if (action) {
      this.props.dispatch(action());
    }
    this.props.dispatch(toggleMenu(null));
  }

  handleConfirmClick = (confirm=false) => {
    if (confirm === true) {
      this.props.dispatch(operateJob());
    }
    this.props.dispatch(toggleConfirm(null));
  }

  render() {
    const { ui, isFetching, jobs, dispatch, username } = this.props;
    const filteredJobs = jobs.filter(job => this.filterJobs(job));
    const compareJobs = ui.jobFilter === 'active' ? compareActiveJobs : compareUserJobs;
    const menuItems = ui.menuType === 'nav' ? navMenuItems : jobMenuItems;

    return (
      <div className='page-main'>
        <Nav
          tabValue={ui.jobFilter}
          onTabChange={this.handleTabChange}
          userLabel={username}
          onMenuClick={event => dispatch(toggleMenu(event.currentTarget, 'nav'))}
        />
        <FetchProgress fetching={isFetching} />
        {((filteredJobs.length === 0 && !ui.firstFetch) || ui.firstFetch) &&
          <div className='fetch-status resizer'>
            {ui.firstFetch ? 'Loading...' : 'Empty'}
          </div>
        }
        <JobList
          jobs={filteredJobs}
          sort={compareJobs}
          dispatch={dispatch}
          username={username}
        />
        <ConfirmDialog
          show={ui.confirmShow}
          close={this.handleConfirmClick}
          jobName={ui.menuType.name}
          actionName={ui.confirmType}
          onCancel={this.handleConfirmClick}
          onConfirm={()=>this.handleConfirmClick(true)}
        />
        <MainMenu
          target={ui.menuTarget}
          show={ui.menuShow}
          close={() => {dispatch(toggleMenu(null))}}
          items={menuItems}
          itemOnClick={this.handleMenuClick}
          clicked={ui.menuType}
        />
      </div>
    );
  }
}


const mapStateToProps = state => {
    return {
      ...state.job,
      ui: state.ui,
      username: state.auth.name
    };
};


export default connect(mapStateToProps)(PageMain);