import React, { Component, PropTypes } from 'react';

import './styles.sass';

const isCurrencyValid = val => (
  val === "₹-INR" ||
  val === "$-DOLLAR" ||
  val === "€-EURO" ||
  val === "£-POUND"
);

const isPriceValid = val => (!isNaN(val) && !isNaN(parseInt(val, 10)));

const scrollElemToTop = (elem) => {
  let timeOut;
  if (elem.scrollTop != 0) {
    elem.scrollTop -= 50;
    timeOut = setTimeout(scrollElemToTop.bind(null, elem), 10);
  }
  else clearTimeout(timeOut);
};

class AddItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: null,
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
    }, 550);
  }

  handleNewItemFormSubmit(event) {
    event.preventDefault();
    const fd = new FormData();
    let emptyFieldMsg;
    [].forEach.call(event.target, (elem) => {
      if (elem.getAttribute('type') !== 'submit') {
        if (elem.getAttribute('type') === 'file') {
          if (!elem.files[0] && !emptyFieldMsg)
            emptyFieldMsg = 'Please add an item picture!';
            fd.append(elem.getAttribute('name'), elem.files[0]);
        } else {
          if (!elem.value)
            emptyFieldMsg = `Item ${elem.getAttribute('name').slice(4)} is a required field!`;
          fd.append(elem.getAttribute('name'), elem.value);
        }
      }
    });
    const currencyValidity = isCurrencyValid(fd.get('itemCurrency'));
    const priceValidity = isPriceValid(fd.get('itemPrice'));

    if (emptyFieldMsg) {
      return this.showErrorMessage(emptyFieldMsg);
    }

    if (currencyValidity && priceValidity) {
      this.setState({ errorMsg: '' });
      this.props.addItem(
        fd,
        this.close.bind(this),
        this.showErrorMessage.bind(this),
        this.hideWaitingMsg.bind(this)
      );
      this.showWaitingMsg();
    } else {
      if (!currencyValidity) {
        this.showErrorMessage('Enter correct currency from the given list!');
      } else if (!priceValidity) {
        this.showErrorMessage('Enter a valid price value!');
      }
    }
  }

  showErrorMessage(str) {
    scrollElemToTop(document.addItemForm);
    this.setState({ errorMsg: str });
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
    } else {
      return;
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
    };
    if (file) {
      const errorElem = document.querySelector('.imgLoadErrors');
      errorElem.innerText = "";

      if (file.size > 512000) {
        errorElem.innerText =
          'Image size is greater than 500kb!';
      } else if (file.type !== 'image/jpeg' && file.type !== 'image/png'
        && file.type !== 'image/gif') {
        errorElem.innerText =
          'Wrong Image Format! Choose a jpeg or png or gif image file.';
      } else {
        fr.readAsDataURL(file);
      }
    }
  }

  render() {
    return (
      <div className="addItemWrapper" ref={node => { this.modalWrapper = node; }}>
        <div className="hider" />
        <div className="modal">
          {this.getWaitingMsg()}
          <div className="heading">
            <h3>Add Item</h3>
          </div>
          <form name="addItemForm"
            encType="multipart/form-data"
            className="itemWrapper"
            onSubmit={this.handleNewItemFormSubmit.bind(this)}
          >
            {this.getErrorMessage()}
            <div className="flexWrapper">
              <div className="itemPicWrapper text-center">
                <div className="img imgStyle"
                  ref={node => this.itemImg = node}
                  onClick={() => this.picInput.click()} />
                <input name="itemPic" type="file"
                  onChange={this.handleItemImgLoad.bind(this)}
                  id="itemPicInput"
                  accept="image/jpeg, image/png, image/gif" ref={node => this.picInput = node} required />
                <label htmlFor="itemPicInput" className="imgText frm">
                  Upload Item Picture
                  <br />
                  <span>Make sure image is good quality square picture and below 500kb</span>
                </label>
                <p className="imgLoadErrors" />
              </div>
              <div className="itemInfoWrapper">
                <div className="inputWrapper">
                  <label htmlFor="itemName">Name:</label>
                  <input id="itemName" name="itemName" type="text" className="itemName" placeholder="Enter Item Name" required />
                </div>
                <div className="priceWrapper">
                  <div className="inputWrapper">
                    <label htmlFor="itemPrice">Price:</label>
                    <input min="0" id="itemPrice" name="itemPrice" type="number" className="itemPrice" placeholder="Enter Item Price" required />
                  </div>
                  <div className="inputWrapper">
                    <label htmlFor="itemCurrency">Currency:</label>
                    <input autoComplete={false} id="itemCurrency" list="currency" name="itemCurrency" type="search" className="itemCurrency" placeholder="Enter Currency" />
                    <datalist id="currency">
                      <option value="₹-INR" />
                      <option value="$-DOLLAR" />
                      <option value="€-EURO" />
                      <option value="£-POUND" />
                    </datalist>
                  </div>
                </div>
                <div className="inputWrapper">
                  <label htmlFor="itemDescription">Description:</label>
                  <textarea name="itemDescription" id="itemDescription" className="itemDescription"
                    placeholder="Enter a good Item Description so that other users get interested in your Item" required />
                </div>
                <div className="inputWrapper">
                  <label htmlFor="itemTags">Tags(Comma Separated):</label>
                  <textarea name="itemTags" id="itemTags"
                    className="itemTags" placeholder="Enter Tags for better searchablity of your Item" required />
                </div>
              </div>
              <input type="submit" ref={node => (this.submitItemFormBtn = node)} style={{ display: 'none' }} />
            </div>
          </form>
          <div className="buttonWrapper">
            <button className="saveItemBtn" onClick={this.saveItem.bind(this)}>Save</button>
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

export default AddItemPage;

