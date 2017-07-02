import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.sass';
import loadPageProps from '../../utils/loadPageProps';
import * as individualItemActions from '../../actions/individualItemActions';

class ItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: ''
    };
  }

  componentDidMount() {
    loadPageProps(`${this.props.app.itemName} - Trader`);
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

  getButton() {
    if (this.props.app.ownItem) {
      return (
        <div className="optionsWrapper">
          <Link className="backLink" to="/myItems">
            Back to your items
          </Link>
        </div>
      );
    } else if(this.props.app.isSoldOut) {
      return (
        <button className="reqTradeBtn normalBtn disabled" disabled={true}>
          Sold Out
        </button>
      );
    } else if (this.props.app.itemRequestedByCurrentUser) {
      return (
        <button className="reqTradeBtn normalBtn disabled" disabled={true}>
          Requested
        </button>
      );
    } else {
      return (
        <button
          className="reqTradeBtn normalBtn"
          onClick={
            () => {
              if (this.props.user.loggedIn) {
                document.querySelector('.reqTradeBtn').classList.add('disabled');
                document.querySelector('.reqTradeBtn').disabled = true;
                this.props
                  .actions.requestItem(
                    this.props.app.key, this.showErrMsg.bind(this)
                  );
              } else {
                browserHistory.push(`/login?l_i=${window.location.pathname}`);
              }
            }
          }
        >
          Request Trade
        </button>
      );
    }
  }

  showErrMsg(str) {
    this.setState({ 'errMsg': str });
  }

  getMsg() {
    if (this.state.errMsg) {
      return (
        <p className="warningMsg">{this.state.errMsg}</p>
      );
    }
    return;
  }

  render() {
    const data = this.props.app;
    return (
      <div className="itemPageWrapper">
        <div className="itemImgWrapper">
          <div className="itemImg bkdPic"
            data-bg={`${data.itemPic}`}
          />
        </div>
        <div className="itemInfoWrapper">
          <Link className="backLink" to="/">
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </span>All Items
          </Link>
          <h3 className="itemName">{data.itemName}</h3>
          <p className="itemCost frm">{`${data.itemCurrency.slice(0, 1)}${data.itemPrice}`}</p>
          <p className="addDate frm">{data.itemAdditionDate}</p>
          <p className="description">
            {data.itemDescription}
          </p>
          <div className="itemTags frm">
            Tags:
            {
              data.itemTags.trim().split(',').map(
                (elem, i) => <span key={i} className="tags">{elem}</span>
              )
            }
          </div>
          <p className="seller frm">By <span>{data.itemOwner}</span></p>
          {this.getMsg()}
          {this.getButton()}
        </div>
      </div>
    );
  }
}

ItemPage.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    app: state.individualItemData,
    user: state.appData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(individualItemActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPage);

