import React from 'react';
import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';

const MatchWhenAuthorized = ({ component: Component, authorized, ...rest }) => (
  <Match
    {...rest}
    render={props => (
      authorized ? (
        <Component {...props}/>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    )}
  />
);


MatchWhenAuthorized.propTypes = {
  component: React.PropTypes.func,
  authorized: React.PropTypes.shape({}),
  location: React.PropTypes.shape({})
};

export default MatchWhenAuthorized;
