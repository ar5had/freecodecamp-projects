import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import * as actions from '../../actions/myItemsActions';
import { toggleFavItem } from '../../actions/favActions';
import loadPageProps from '../../utils/loadPageProps';
import Item from '../../components/Item';

import './styles.sass';

class Favourites extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    loadPageProps('Favourites - Polaroids');
  }

  getAllItemsData() {
    const data = this.props.state.filter(elem => this.props.favItems.includes(elem.key));
    const { favItems } = this.props;
    if (data.length > 0) {
      const items = data.map((e, i) => {
        const hasUserLiked = favItems.includes(parseInt(e.key,10));
        return (
          <Item
            key={e.key}
            photoId={e.key}
            picture={e.picture}
            caption={e.caption}
            hasUserLiked={hasUserLiked}
            likesCount={e.likesCount}
            ownerName={e.ownerName}
            ownerDp={e.ownerDp}
            toggleFavItem={this.props.toggleFavItem}
            ownerUserId={e.ownerUserId}
            pos={i}
            userLoggedIn={this.props.userLoggedIn}
          />
        );
      });
      return (
        <div className={`favpolaroidsWrapper mypolaroidsWrapper`}>
          {items}
        </div>
      );
    } else {
      return (
        <div className="noItemHeadingWrapper">
          <h3 className="noItemHeading pmf"> No post found!</h3>
        </div>
      );
    }
  }


  render() {
    return (
      <div className="favourites">
        <h4 className="heading">Your Favourites</h4>
        {this.getAllItemsData()}
      </div>
    );
  }
}

Favourites.propTypes = {
  state: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  toggleFavItem: PropTypes.func.isRequired,
  favItems: PropTypes.array.isRequired,
  userLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({ state: state.allItemsData, userLoggedIn: state.appData.loggedIn, favItems: state.favourites });

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch), toggleFavItem: bindActionCreators(toggleFavItem, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
