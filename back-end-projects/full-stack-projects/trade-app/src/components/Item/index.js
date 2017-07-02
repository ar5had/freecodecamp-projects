import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import './styles.sass';

class Item extends Component {

  openItem(url) {
    browserHistory.push(url);
  }

  render() {
    const {name, price, itemId, pic} = this.props;
    const url = `/item/${itemId}`;
    const openItem = this.openItem.bind(this, url);

    return(
      <div className="item text-center"
        ref={node => this.item = node}
        onClick={openItem}
      >
        <div className="content bkdPic"
          ref={node => this.pic = node}
          data-bg={`${pic}`}
        />
        <div>
          <h3 className="itemName">
            {name}
          </h3>
          <br />
          <p className="itemCost">
            {price}
          </p>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
  pic: PropTypes.string.isRequired
};

export default Item;
