import React, { Component } from 'react';
import {socketConnect} from 'socket.io-react';

import './SearchBar.css';


class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
    this.emptyCodeMsg = (<div className="msg marB">
                          Empty input, enter valid code!
                        </div>);
    this.wrongCodeMsg = (<div className="msg marB">
                          Wrong stock code, enter correct code!
                        </div>);
    this.stockExistsMsg = (<div className="msg marB">
                            Stock already exists!
                          </div>);
    this.loader = (<div className="loader marB" />);
  }

  emitRemoveAllEvent(code) {
    this.props.socket.emit('removeAllStock');
    this.props.socket.emit('notify', {name: 'REMOVE_ALL'});
  }

  makexhr(e) {
    e.preventDefault();
    const text = this.textInput.value.trim().toUpperCase();
    if(!text) {
      this.setState({
        message: this.emptyCodeMsg
      });
    }  else {
      this.setState({
        message: this.loader
      });
      fetch('/stock/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: this.textInput.value.toUpperCase()
        })
      }).then(response => {
        if(response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          this.setState({
            message: this.stockExistsMsg
          });
          throw new Error(response);
        } else {
          this.setState({
            message: this.wrongCodeMsg
          });
          throw new Error(response);
        }
      }).then(data => {
        this.props.socket.emit("addStock",data);
        this.props.socket.emit('notify', {name: 'ADD', code: data.code});
        this.props.addStock(data);
        this.textInput.value = "";
        this.setState({
          message: ""
        });
      }).catch(err => {
        console.error("Error happened while making /stock/add req:", err);
      });
    }
  }

  // Graph dimension is dependent on viewport height.
  // This method restricts resiszing of graph when android's keyboard is opened
  inputFocus() {
    const graphWrapper = document.querySelector(".wrapper");
    graphWrapper.style.height = `${graphWrapper.offsetHeight}px`;
  }

  inputBlur() {
    const graphWrapper = document.querySelector(".wrapper");
    graphWrapper.style.height = "100%";
  }

  render() {
    return (
      <div id="searchBar" className={this.props.classes}>
        <form onSubmit={this.makexhr.bind(this)} id="addStockForm">
          <input name="searchInput" type="text"
            className="searchInput" onFocus={this.inputFocus.bind(this)}
            placeholder="Stock Code" onBlur={this.inputBlur.bind(this)}
            ref={
              input => {
                this.textInput = input;
              }
            }
            autoComplete="off"
          />
          <input className="searchButton" type="submit" value="Add" />
        </form>
        <div className="marB" id="removeAllWrapper">
          <button id="removeAll" onClick={
            () => {
              Array.prototype.forEach.call(
                document.querySelectorAll(".stock"),
                elem => {
                    elem.style.opacity = ".8";
                });
              this.emitRemoveAllEvent();
            }
          }>
            Remove All
          </button>
        </div>
        <div className="messageArea marB"
          ref={(elem) => {
            this.msgArea = elem;
          }}
        >
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default socketConnect(SearchBar);
