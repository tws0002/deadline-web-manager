import React from 'react';
import { connect } from 'react-redux';
import PageLogin from './PageLogin';
import PageMain from './PageMain';


const Switcher = props => {
  if (!props.isAuth) {
    return <PageLogin />;
  }else{
    return <PageMain />;
  }
}


const mapStateToProps = state => {
    return {
      isAuth: state.auth.isAuth
    };
};


export default connect(mapStateToProps)(Switcher);