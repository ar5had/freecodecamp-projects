import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './styles.sass';

class Item extends Component {

  getHeartButtonClasses(hasUserLiked) {
    if (hasUserLiked) {
      return 'heart-button liked';
    } else {
      return 'heart-button';
    }
  }

  getBtns(hasUserLiked, likesCount, ownerName,
          ownerDp, photoId, pos, ownerUserId, userLoggedIn) {
    if (this.props.ownItem) {
      return (
        <div className="pauthinfo osf">
          { userLoggedIn ?
            <span className="heartBtnWrapper">
              {likesCount ? likesCount : ''}
              <span className={this.getHeartButtonClasses(hasUserLiked)}
                onClick={(e) => {
                  e.target.classList.add('wait');
                  const likesChange = hasUserLiked ? -1 : 1;
                  this.props.toggleFavItem(photoId, e.target, likesChange, pos);
                }}
              />
            </span> :
            ''
          }
          <span className="delete-button"
            onClick={(e) => {
              const parent = e.target.parentNode.parentNode.parentNode;
              parent.classList.add('deleted');
              this.props.deleteItem(this.props.photoId, parent);
            }}
          />
        </div>
      );
    }

    return (
      <div className="pauthinfo osf">
        { userLoggedIn ?
          <span className="heartBtnWrapper">
            {likesCount ? likesCount : ''}
            <span className={this.getHeartButtonClasses(hasUserLiked)}
              onClick={(e) => {
                e.target.classList.add('wait');
                const likesChange = hasUserLiked ? -1 : 1;
                this.props.toggleFavItem(photoId, e.target, likesChange, pos);
              }}
            />
          </span> :
          ''
        }
        <Link className="author-img tooltip" to={`/user/${ownerUserId}`} title={ownerName}>
          <span style={{ backgroundImage: `url(${ownerDp})` }}>{ownerName}</span>
        </Link>
      </div>
    );
  }

  render() {
    const {
      caption,
      likesCount,
      hasUserLiked,
      picture,
      photoId,
      ownerName,
      ownerDp,
      pos,
      ownerUserId,
      userLoggedIn
    } = this.props;

    return (
      <div className="item">
        <div className="picture">
          <div
            style={{ backgroundImage: `url(${picture})` }}
          />
        </div>
        <div className="info">
          <span className="pmf pname">{caption}</span>
          {
            this.getBtns(
              hasUserLiked,
              likesCount,
              ownerName,
              ownerDp,
              photoId,
              pos,
              ownerUserId,
              userLoggedIn
            )
          }
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  photoId: PropTypes.number,
  picture: PropTypes.string,
  caption: PropTypes.string,
  hasUserLiked: PropTypes.bool,
  likesCount: PropTypes.number,
  ownerName: PropTypes.string,
  ownerDp: PropTypes.string,
  deleteItem: PropTypes.func,
  location: PropTypes.string,
  ownerUserId: PropTypes.string,
  ownItem: PropTypes.bool,
  toggleFavItem: PropTypes.func.isRequired,
  pos: PropTypes.number.isRequired,
  userLoggedIn: PropTypes.bool.isRequired
};

export default Item;
