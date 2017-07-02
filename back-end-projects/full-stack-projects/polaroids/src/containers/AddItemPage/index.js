import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addMyItem } from '../../actions/myItemsActions';

import addImg from '../../assets/images/add.svg';

import './styles.sass';

class AddItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showWaitingMsg: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.modalWrapper.classList.add(this.props.openClass);
    }, 50);
  }

  close() {
    this.modalWrapper.classList.remove(this.props.openClass);
    setTimeout(() => {
      this.props.close();
    }, 600);
  }

  handleNewItemFormSubmit(event) {
    event.preventDefault();
    const fd = new FormData();
    let emptyFieldMsg;
    [].forEach.call(event.target, (elem) => {
      if (elem.getAttribute('type') !== 'submit') {
        if (elem.getAttribute('type') === 'file') {
          if (!elem.files[0] && !emptyFieldMsg) {
            emptyFieldMsg = 'PHOTO';
          }
          fd.append(elem.getAttribute('name'), elem.files[0]);
        } else {
          if (!elem.value) {
            emptyFieldMsg = 'CAPTION';
          }
          fd.append(elem.getAttribute('name'), elem.value);
        }
      }
    });
    if (emptyFieldMsg) {
      return this.showErrorMessage(emptyFieldMsg);
    }
    this.setState({ error: '' });
    this.props.addItem(
      fd,
      this.close.bind(this),
      this.showErrorMessage.bind(this),
      this.hideWaitingMsg.bind(this)
    );
    this.showWaitingMsg();

  }

  showErrorMessage(str) {
    this.setState({ error: str });
  }

  showWaitingMsg() {
    this.setState({ showWaitingMsg: true });
  }

  hideWaitingMsg() {
    this.setState({ showWaitingMsg: false });
  }

  getWaitingMsg() {
    if (!this.state.showWaitingMsg) {
      return;
    } else {
      return (
        <div className="wmWrapper">
          <div>
            <h3>Hang on tight!</h3>
            <div>
              <div />
            </div>
          </div>
        </div>
      );
    }
  }

  getErrorMessage() {
    if (this.state.errorMsg) {
      return (
        <div className="errorMsgWrapper">
          <h3 className="fullWidthFlexItem error">{this.state.errorMsg}</h3>
        </div>
      );
    }
  }

  saveItem() {
    // triggers form submit
    this.submitItemFormBtn.click();
  }

  handleItemImgLoad(event) {
    const input = event.target;
    const file = input.files[0];
    const fr = new FileReader();
    fr.onload = () => {
      this.itemImg.classList.add('imgLoaded');
      this.itemImg.style.background = `url( ${fr.result} )`;
      this.itemImg.innerHTML = '';
    };
    if (file) {
      const errorElem = document.querySelector('.imgLoadErrors');
      errorElem.innerText = "";

      if (file.size > 512000) {
        errorElem.innerText =
          'Image size should be less than 500kb!';
      } else if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        errorElem.innerText =
          'Wrong Image Format! Choose a jpeg or png image file.';
      } else {
        fr.readAsDataURL(file);
      }
    }
  }

  getOtherClass(str) {
    if(this.state.error === str) {
      return 'incomplete';
    } else {
      return '';
    }
  }

  render() {
    return (
      <div className="addItemWrapper" ref={node => { this.modalWrapper = node; }}>
        <div className="hider" />
        <div className="modal">
          {this.getWaitingMsg()}
          <div className="heading">
            <h3>New Post</h3>
          </div>
          <form name="addItemForm"
            encType="multipart/form-data"
            className="itemWrapper"
            onSubmit={this.handleNewItemFormSubmit.bind(this)}
          >
            <p className="imgLoadErrors" />
            <div>
              <div className="itemPicWrapper">
                <div className="imgWrapper">
                  <div className={`img imgStyle ${this.getOtherClass('PHOTO')}`}
                    ref={node => this.itemImg = node}
                    onClick={() => this.picInput.click()}
                  >
                    <img src={addImg} />
                  </div>

                  <input name="picture" type="file"
                    onChange={this.handleItemImgLoad.bind(this)}
                    id="itemPicInput"
                    accept="image/jpeg, image/png" ref={node => this.picInput = node}
                  />
                  <input className={`captionText pmf ${this.getOtherClass('CAPTION')}`} type="text" autoComplete="off"
                    required="true" placeholder="Caption" name="caption"
                  />
                  <input type="submit" ref={node => (this.submitItemFormBtn = node)} style={{ display: 'none' }} />
                </div>
              </div>
            </div>
          </form>
          <div className="buttonWrapper">
            <button className="saveItemBtn" onClick={this.saveItem.bind(this)}>Post</button>
            <button className="cancelItemBtn" onClick={this.close.bind(this)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}


AddItemPage.propTypes = {
  close: PropTypes.func,
  openClass: PropTypes.string,
  addItem: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({ addItem: bindActionCreators(addMyItem, dispatch) });

export default connect(null, mapDispatchToProps)(AddItemPage);
