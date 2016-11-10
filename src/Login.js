import React, { Component, PropTypes } from 'react';
import Redirect from 'react-router/Redirect';
import { autobind } from 'core-decorators';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      usernameType: 'name',
    };
  }

  @autobind
  handleUsernameChange(ev) {
    this.setState(Object.assign({}, { username: ev.target.value }));
  }

  @autobind
  handlePasswordChange(ev) {
    this.setState(Object.assign({}, { password: ev.target.value }));
  }

  @autobind
  handleUsernameTypeTypeChange(ev) {
    this.setState(Object.assign({}, { usernameType: ev.target.name }));
  }

  @autobind
  handleLoginSubmit() {
    this.props.onLogin(this.state.username, this.state.password, this.state.usernameType);
  }

  render() {
    const redirect = this.props.authorized && (
      <Redirect to={this.props.location.state.from || '/'}/>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {redirect}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <label htmlFor="login">user::</label>
          <input
            type="text"
            name="username"
            onChange={this.handleUsernameChange}
            value={this.state.username}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <label htmlFor="password">pass::</label>
          <input
            type="password"
            name="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <label htmlFor="name">name::</label>
          <input
            onChange={this.handleUsernameTypeTypeChange}
            checked={this.state.usernameType === 'name'}
            style={{ margin: '0 5px' }} type="radio" name="name"
          />
          <label htmlFor="userId">ID::</label>
          <input
            onChange={this.handleUsernameTypeTypeChange}
            checked={this.state.usernameType === 'userId'}
            style={{ margin: '0 5px' }}
            type="radio"
            name="userId"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <input
            type="submit"
            name="event"
            onClick={this.handleLoginSubmit}
            value="login"
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  authorized: PropTypes.shape({}),
  location: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};
