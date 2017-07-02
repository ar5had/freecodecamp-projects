import React, { Component } from 'react';

import { Link } from 'react-router';

import './styles.sass';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p className="has-link">
          <span>
            <span className="code">&lt;/&gt;</span> by <a target="blank" href="http://iamarshad.com">Arshad Khan</a>
          </span>
          <span className="credits"><Link to="/credits">Credits</Link></span>
        </p>
      </footer>
    );
  }
}

export default Footer;
