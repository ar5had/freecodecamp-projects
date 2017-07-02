import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as myItemsActions from '../../actions/myItemsActions';

import UserItem from '../../components/UserItem/index';
import AddItemPage from '../../components/AddItemPage/index';
import './styles.sass';
import loadPageProps from '../../utils/loadPageProps';

class MyItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
  }

  componentDidMount() {
    loadPageProps('My Items - Trader');
    this.displayWidthWiseImages();
    // window.addEventListener('resize', () => {
    //   clearTimeout(window.reloadImages);
    //   window.reloadImages = setTimeout(() => {
    //     this.displayWidthWiseImages();
    //   }, 500);
    // });
  }

  displayWidthWiseImages() {
    Array.from(document.querySelectorAll('[data-bg]')).forEach(image => {
      const { clientWidth, clientHeight } = image;
      const imageParams = `w_${clientWidth},h_${clientHeight},f_auto,q_80`;
      const [head, end] = image.dataset.bg.split('upload');
      image.style.backgroundImage = `url('${head}upload/${imageParams}${end}')`;
    });
  }

  closeModal() {
    this.setState({ modalOpened: false });
    document.body.classList.remove('modal-opened');
    document.body.style.marginRight = 0;
  }

  getModal() {
    if (this.state.modalOpened) {
      return (
        <AddItemPage
          openClass="open" close={this.closeModal.bind(this)}
          addItem={this.props.actions.addMyItem.bind(this)} />
      );
    } else {
      return;
    }
  }

  openModal() {
    const scrollBar = document.querySelector('.scrollbar-measure');
    const scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth;
    document.body.classList.add('modal-opened');
    document.body.style.marginRight = `${scrollBarWidth}px`;
    this.setState({ modalOpened: true });
  }

  getItems() {
    if (this.props.items.length > 0) {
      return this.props.items.map(
        item =>
          <UserItem key={item.key} data={item} deleteItem={this.props.actions.deleteMyItem.bind(this)}/>
      );
    } else {
      return <h3 className="noItemHeading"> You haven't added any item yet! Click on ADD ITEM button to add item </h3>;
    }
  }

  render() {
    return (
      <div className="myItemsWrapper">
        {this.getModal()}
        <div className="addTradeWrapper">
          <button
            onClick={() => {
              this.openModal();
            }}
            className="tradeBtn addItemBtn">
            + Add Item
          </button>
        </div>
        {this.getItems()}
      </div>
    );
  }
}

MyItems.propTypes = {
  items: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    items: state.myItemsData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(myItemsActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyItems);
