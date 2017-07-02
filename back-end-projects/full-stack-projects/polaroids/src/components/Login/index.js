import React, { Component, PropTypes } from 'react';

import './styles.sass';

import loadPageProps from '../../utils/loadPageProps';


class Login extends Component {
  componentDidMount() {
    loadPageProps('Login - Polaroids');
  }

  render() {
    let last_item = this.props.location.query.l_i;
    let query = "";
    if(last_item) {
      query = `?l_i=${last_item}`;
    }
    return (
      <div className="loginWrapper">
        <h3 className="loginHeading text-center pmf">Login with any of your Social Account</h3>
        <div className="btnWrapper">
          <a href={`/auth/facebook${query}`}><button className="loginBtn fbBtn">Facebook Login</button></a>
          <a href={`/auth/google${query}`}><button className="loginBtn googleBtn">Google Login</button></a>
          <a href={`/auth/twitter${query}`}><button className="loginBtn twitterBtn">Twitter Login</button></a>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired
};

export default Login;
