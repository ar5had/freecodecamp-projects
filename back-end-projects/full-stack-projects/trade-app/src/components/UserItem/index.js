import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './styles.sass';

class UserItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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

  render() {
    const { data } = this.props;
    return (
      <div className="uIWrapper" ref={node => this.itemNode = node}>
        <div className="upper">
          <Link to={`/item/${data.key}`}>
            <div className="userImg bkdPic"
            data-bg={data.itemPic} />
          </Link>
          <div className="itemInfo">
            <h3 className="itemName">
              <Link to={`/item/${data.key}`}>{data.itemName}</Link>
            </h3>
            <p className="itemCost frm">{`${data.itemCurrency.slice(0,1)}${data.itemPrice}`}</p>
            <p className="addDate frm">{data.itemAdditionDate}</p>
            <p className="itemDescription">
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
            <div ref={node => this.rbw = node}
              className="tradeBtnWrapper lower removeBtnWrapper">
              <div>
                <p>Are you sure?</p>
                <button onClick={() => {
                  this.itemNode.classList.add('blacklisted');
                  this.props.deleteItem(data.key, this.itemNode);
                }}>
                  Yes
                </button>
                <button onClick={() => {
                  this.rbw.classList.remove('open');
                }}>
                  No
                </button>
              </div>
              <button className="deleteBtn normalBtn"
                onClick={() => {
                  this.rbw.classList.add('open');
                }}
              >
               Remove Item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserItem.propTypes = {
  data: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default UserItem;
