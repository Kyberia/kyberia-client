import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { login } from './redux/reducers/auth';
import Login from './Login';
import './App.css';

export class App extends Component {

  constructor() {
    super();
    this.handleLoginB = this.handleLogin.bind(this);
  }

  handleLogin(username, password, usernameType) {
    this.props.login(username, password, usernameType);
  }

  render() {
    return (
      <div className="App">
        {
          !this.props.isLoggedIn
            ? <Login onLogin={this.handleLoginB}/>
            : <div>{JSON.stringify(this.props.user)}</div>
        }
      </div>
    );
  }
}


App.propTypes = {
  isLoggedIn: PropTypes.bool,
  login: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
};


const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(App);
