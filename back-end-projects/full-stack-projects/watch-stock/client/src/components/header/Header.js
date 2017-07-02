import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  toggle() {
    const toggleBtn = document.getElementById("toggleButton");
    const panel = document.getElementById("panel");

    if (!panel.classList.contains('is-active')) {
      panel.scrollTop = 0;
    }

    toggleBtn.classList.toggle("is-active");

    panel.classList.toggle("is-active");

    document.body.classList.toggle("is-active");
  }

  render() {
    return (
      <div id="header" className={this.props.classes}>
        <h3 id="logo">
          WatchStock
        </h3>

        <button id="toggleButton" className="hamburger hamburger--spin" type="button" onClick={this.toggle.bind(this)}>
          <span className="hide-sm">Menu</span> 
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
    );
  }
}

export default Header;
