import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import objectAssign from 'object-assign';

import * as profileActions from '../../actions/profileActions';

import BasicInfo from '../../components/BasicInfo/index';
import OtherInfo from '../../components/OtherInfo/index';
import './styles.sass';
import loadPageProps from '../../utils/loadPageProps';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: true
    };
  }

  componentDidMount() {
    loadPageProps('Profile - Trader');
    Array.from(document.querySelectorAll('[data-bg]')).forEach(image => {
      image.style.backgroundImage = `url('${image.dataset.bg}')`;
    });
  }

  updateProfileState(changedState, editSection) {
    this.props.actions.updateProfileState(changedState, editSection);
  }

  getMessage() {
    if (this.state.showMessage && this.props.location.query.message === "fillProfileInfo") {
      return (
        <div className="message frm" ref={node => (this.message = node)}>
          <p>Please fill your profile informations. You info will be shared with the other user when you propose/accept trade.</p>
          <span
            onClick={
              () => {
                objectAssign(this.message.style,{opacity:"0",marginBottom: `-${this.message.offsetHeight}px`, zIndex: '-99'});
                setTimeout(() => { this.setState({ showMessage: false }); }, 250);
              }
            }
          >
            x
            </span>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="infoWrapper">
        {this.getMessage()}
        {/*
          no need to pass update method to basic info as for this appm picture and
          and name of user will not be mutable and their value will be based upon
          the social account which user uses to sign in.
        */}
        <BasicInfo data={this.props.profile} />
        <OtherInfo data={this.props.profile} updateProfileState={this.updateProfileState.bind(this)} />
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    profile: state.profileData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(profileActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
