import React, { Component, PropTypes } from 'react';

import './styles.sass';

class BasicInfo extends Component {
  render() {
    const { dp, name } = this.props;
    return(
      <div className="basicInfo">
        <div style={{backgroundImage: `url(${dp})`}}
          className="profilePic"
        />
        <div className="nameWrapper">
          <h3 className="normal">{name}</h3>
        </div>
      </div>
    );
  }
}

BasicInfo.propTypes = {
  name: PropTypes.string.isRequired,
  dp: PropTypes.string.isRequired
};

export default BasicInfo;
