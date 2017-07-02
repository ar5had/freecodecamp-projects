import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../../actions/appActions';

import './styles.sass';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.previousWidth = 0;
    this.menuButton = (
      <button className="menuBtn"
        onClick={
          () => {
            document.querySelector(".menu").classList.toggle("open");
          }
        }
      >
        MENU
      </button>
    );

    this.loggedInMenu = (
      <div className="menu">
        <Link onlyActiveOnIndex={true} key={1} to="/"
          activeClassName="activeNavLink" className="navLink"
          onClick={this.collapseMenu.bind(this)} >
          Home
        </Link>
        <Link onlyActiveOnIndex={true} key={2} to="/profile"
          activeClassName="activeNavLink" className="navLink"
          onClick={this.collapseMenu.bind(this)} >
          Profile
        </Link>
        <Link onlyActiveOnIndex={true} key={7} to="/myItems"
          activeClassName="activeNavLink" className="navLink"
          onClick={this.collapseMenu.bind(this)} >
          My Items
        </Link>
        <Link onlyActiveOnIndex={true} key={3} to="/trades"
          activeClassName="activeNavLink" className="navLink"
          onClick={this.collapseMenu.bind(this)} >
          Trades
          {
            this.props.app.notificationsCount > 0 ?
            `(${this.props.app.notificationsCount})` :
            ''
          }
        </Link>
        <Link onlyActiveOnIndex={true} key={4}
          activeClassName="activeNavLink" className="navLink"
          onClick={
            () => {
              this.collapseMenu();
              fetch('/logout', {method: 'POST', credentials: 'same-origin'})
              .then(res => {
                if(res.status === 200) {
                  this.props.actions.updateAppState({ loggedIn: false });
                  browserHistory.push('/');
                }
              })

              .catch(err => {
                /*eslint-disable no-alert, no-console */
                console.error(`Error Happened while logging out- ${err}`);
              });
            }
          }
        >
          Logout
        </Link>
      </div>
    );

    this.loggedOutMenu = (
      <div className="menu loginMenu">
        <Link onlyActiveOnIndex={true} key={1} to="/"
          activeClassName="activeNavLink" className="navLink"
          onClick={this.collapseMenu.bind(this)} >
          Home
        </Link>
        <Link onlyActiveOnIndex={true} key={5} to="/login"
          activeClassName="activeNavLink" className="navLink"
          onClick={this.collapseMenu.bind(this)} >
          LogIn | Sign Up
        </Link>
      </div>
    );

    this.setMenuState(window.innerWidth);
    this.previousWidth = window.innerWidth;

  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setMenuState(window.innerWidth);
    });
  }

  collapseMenu() {
    document.querySelector('.menu').classList.remove('open');
  }

  setMenuState(width) {
    if (this.previousWidth !== width) {
      if (width > 768) {
        const menu = document.querySelector('div.menu');
        if (menu) {
          menu.classList.remove("open");
        }
        this.setState({ menuActive: false });
      } else {
        this.setState({ menuActive: true });
      }
      this.previousWidth = width;
    }
  }

  getNav() {
    // check for auth here
    if (this.props.app.loggedIn) {
      return this.loggedInMenu;
    } else {
      return this.loggedOutMenu;
    }
  }

  render() {
    return (
      <header className="header">
        <h1>
          <Link onlyActiveOnIndex={true} to="/" className="logo">
            Trader
          </Link>
        </h1>
        {this.state.menuActive ? this.menuButton : ""}
        {this.getNav()}
      </header>
    );
  }
}

Header.propTypes = {
  app: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    app: state.appData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
