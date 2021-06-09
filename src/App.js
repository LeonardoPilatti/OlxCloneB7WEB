//npm install redux react-redux --save;
// npm install react-router-dom --save;
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

import Header from './components/partials/Header/Header';
import Footer from './components/partials/Footer/Footer';

const Page = (props) => {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

/// esse mapStateToProps e o MapDispatchToProps eh do Redux;
