import React, { Component } from 'react';

import './styles.sass';

import loadPageProps from '../../utils/loadPageProps';

class Credits extends Component {
  componentDidMount() {
    loadPageProps('Credits | Polaroids');
  }

  render() {
    return (
      <div className="creditsWrapper">
        <h4 className="heading">
          <span className="title">Credits</span>
        </h4>
        <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.</div>
        <div>Icons made by <a href="http://www.flaticon.com/authors/hanan" title="Hanan">Hanan</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.</div>
        <div>Icons made by <a href="http://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.</div>
      </div>
    );
  }
}

export default Credits;
