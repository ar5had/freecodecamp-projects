import React, { PropTypes } from 'react';

import './styles.sass';
import userImage from '../../assets/images/user.svg';

const BasicInfo = ({data}) => {
  return(
    <div className="basicInfo">
      <div className="profilePic">
        <img src={data.dp ? data.dp : userImage} alt={data.name} />
      </div>
      <div className="nameWrapper">
        <h3 className="normal">{data.name}</h3>
      </div>
    </div>
  );
};

BasicInfo.propTypes = {
  data: PropTypes.object.isRequired
};

export default BasicInfo;
