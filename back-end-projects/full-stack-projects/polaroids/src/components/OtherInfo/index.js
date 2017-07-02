import React, { Component, PropTypes } from 'react';

import Item from '../Item';

import './styles.sass';

class OtherInfo extends Component {
  constructor(props) {
    super(props);
  }

  getAllItemsData() {
    const data = this.props.items;
    const favItems = this.props.favItems;
    if(data.length > 0) {
      const items = data.map((e, i) => {
        const hasUserLiked = favItems.includes(e.key);
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
            deleteItem={this.props.deleteItem}
            ownItem={this.props.ownItem}
            toggleFavItem={this.props.toggleFavItem}
            ownerUserId={e.ownerUserId}
            pos={i}
            userLoggedIn={this.props.userLoggedIn}
          />
        );
      });
      return (
        <div className={`myPolaroidsWrapper`}>
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
      <div className="otherInfo">
        <h4 className="heading">
          {
            this.props.isPublicPage ?
            `${this.props.ownerName.split(' ')[0]}'s Posts`:
            `Your Posts`
          }
        </h4>
        {this.getAllItemsData()}
      </div>
    );
  }
}

OtherInfo.propTypes = {
  items: PropTypes.array.isRequired,
  deleteItem: PropTypes.func,
  ownItem: PropTypes.bool,
  favItems: PropTypes.array,
  toggleFavItem: PropTypes.func.isRequired,
  ownerName: PropTypes.string,
  isPublicPage: PropTypes.bool,
  userLoggedIn: PropTypes.bool.isRequired
};

export default OtherInfo;
