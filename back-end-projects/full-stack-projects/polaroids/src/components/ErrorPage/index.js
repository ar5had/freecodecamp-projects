import React, { Component } from 'react';

import loadPageProps from '../../utils/loadPageProps';

import './styles.sass';

class ErrorPage extends Component {
  componentDidMount() {
    loadPageProps('404 - Page Not Found!');
  }

  render() {
    return (
      <div className="errorHeadingWrapper">
        <h3 className="error text-center pmf">404(Page Not Found)</h3>
      </div>
    );
  }
}

export default ErrorPage;
