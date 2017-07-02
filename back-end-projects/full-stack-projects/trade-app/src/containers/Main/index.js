import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './styles.sass';
import Item from '../../components/Item/index';
import loadPageProps from '../../utils/loadPageProps';

class Homepage extends Component {
  componentDidMount() {
    loadPageProps('Home - Trader');
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

  getAllItemsData() {
    const data = this.props.app;
    if(data.length > 0) {
      return data.map((e) =>
        <Item key={e.key} itemId={e.key} pic={e.itemPic}
          price={`${e.itemCurrency.slice(0,1)}${e.itemPrice}`} name={e.itemName} />);
    } else {
      return <h3 className="noItemHeading"> No items found!</h3>;
    }
  }

  render() {
    return (
      <main className="main">
        {this.getAllItemsData()}
        {
          this.props.app.length > 0 ?
            <div className="item" /> : ""
        }
      </main>
    );
  }
}

Homepage.propTypes = {
  app: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    app: state.allItemsData
  };
};


export default connect(
  mapStateToProps
)(Homepage);
