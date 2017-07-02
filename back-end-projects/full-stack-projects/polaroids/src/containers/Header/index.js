import React, { Component, PropTypes } from 'react';
import { Link, browserHistory  } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/appActions';

import './styles.sass';

import AddItemPage from '../AddItemPage/index';

import pimg from '../../assets/images/polaroidb.svg';
import addimg from '../../assets/images/add.svg';


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
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
          activeClassName="activeNavLink"
          className="navLink"
          onClick={this.collapseMenu.bind(this)}
        >
          Posts
        </Link>
        <Link onlyActiveOnIndex={true} key={2} to="/profile"
          activeClassName="activeNavLink"
          className="navLink"
          onClick={this.collapseMenu.bind(this)}
        >
          Profile
        </Link>
        <Link onlyActiveOnIndex={true} key={3} to="/favourites"
          activeClassName="activeNavLink"
          className="navLink"
          onClick={this.collapseMenu.bind(this)}
        >
          Favourites
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
                  location.reload();
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
          activeClassName="activeNavLink"
          className="navLink"
          onClick={this.collapseMenu.bind(this)}
        >
          Posts
        </Link>
        <Link onlyActiveOnIndex={true} key={5} to="/login"
          activeClassName="activeNavLink"
          className="navLink"
          onClick={this.collapseMenu.bind(this)}
        >
          Login | Signup
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

  setMenuState(width) {
    if (this.previousWidth !== width) {
      if (width > 500) {
        const menu = document.querySelector('div.menu');
        if(menu) {
          menu.classList.remove("open");
        }
        this.setState({menuActive: false});
      } else {
        this.setState({menuActive: true});
      }
      this.previousWidth = width;
    }
  }

  getFixedButtons() {
    if(this.props.state.loggedIn) {
      return (
        <button className="fbWrapper" onClick={
          () => {
            this.openModal();
          }
        }>
          <img src={addimg} />
        </button>
      );
    }
  }

  closeModal() {
    this.setState({ modalOpened: false });
    document.body.classList.remove('modal-opened');
    document.body.style.marginRight = 0;
  }

  getModal() {
    if (this.state.modalOpened) {
      return (
        <AddItemPage
          openClass="open" close={this.closeModal.bind(this)}
          addItem={this.closeModal.bind(this)} />
      );
    }
  }

  openModal() {
    const scrollBar = document.querySelector('.scrollbar-measure');
    const scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth;
    document.body.classList.add('modal-opened');
    document.body.style.marginRight = `${scrollBarWidth}px`;
    // const fbw = document.querySelector('.fbWrapper');
    this.setState({ modalOpened: true });
  }

  getNav() {
    // check for auth here
    if (this.props.state.loggedIn) {
      return this.loggedInMenu;
    } else {
      return this.loggedOutMenu;
    }
  }

  collapseMenu() {
    document.querySelector('.menu').classList.remove('open');
  }

  render() {
    return (
      <header className="header">
        <h1>
          <Link onlyActiveOnIndex={true} to="/" className="logo">
            <img src={pimg} />
          </Link>
        </h1>
        {this.state.menuActive ? this.menuButton: ""}
        {this.getFixedButtons()}
        {this.getModal()}
        {this.getNav()}
      </header>
    );
  }
}

Header.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({state: state.appData});

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
