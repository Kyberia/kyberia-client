import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Match, Redirect } from 'react-router';
import { autobind } from 'core-decorators';

import { login, logout } from './redux/reducers/auth';
import Login from './Login';
import MatchWhenAuthorized from './components/MatchWhenAuthorized';
import './App.css';

export class App extends Component {

  @autobind
  handleLogin(username, password, usernameType) {
    this.props.login(username, password, usernameType);
  }

  @autobind
  handleLogout() {
    this.props.logout();
  }

  render() {
    const Settings = () => <div>{JSON.stringify(this.props.user)}</div>;
    const Mail = () => <div>Here will be mail</div>;
    const Main = () => <div>Here will be main</div>;

    return (
      <div className="App">
        <nav>
          <ul className="AppNavigation">
            <li><Link to="/main">main</Link></li>
            <li><Link to="/mail">mail</Link></li>
            <li><Link to="/settings">settings</Link></li>
            {this.props.user && <li><a href="/" onClick={this.handleLogout}>logout</a></li>}
          </ul>
        </nav>
        <br/>
        <Match
          pattern="/login"
          component={
            props => <Login authorized={this.props.user} onLogin={this.handleLogin} {...props}/>
          }
        />
        <MatchWhenAuthorized
          pattern="/"
          authorized={this.props.user}
          component={() => <Redirect to="/main"/>}
        />
        <MatchWhenAuthorized
          pattern="/mail"
          authorized={this.props.user}
          component={Mail}
        />
        <MatchWhenAuthorized
          pattern="/main"
          authorized={this.props.user}
          component={Main}
        />
        <MatchWhenAuthorized
          pattern="/settings"
          authorized={this.props.user}
          component={Settings}
        />
      </div>
    );
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
};


const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login, logout })(App);
