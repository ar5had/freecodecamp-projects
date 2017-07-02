import React, {Component} from 'react';
import {socketConnect} from 'socket.io-react';

class Stock extends Component {

  emitRemoveEvent(code) {
    this.props.socket.emit('removeStock', code);
    this.props.socket.emit('notify', {name: 'REMOVE', code: code});
  }

  render() {
    return (
      <div
        className={
          (this.props.hide ? "hide ": "") + "stockWrapper marB"
        }
      >
        <div className="stock">
          <h4>{this.props.code}</h4>
          <p>{this.props.description}</p>
          <button className="removeStockBtn"
            ref={(node) => {this.removeButton = node;}}
            onClick={(e) => {
              e.target.parentNode.style.opacity = ".8";
              this.emitRemoveEvent(this.props.code);
            }}
          >
            x
          </button>
        </div>
      </div>
    );
  }
}

export default socketConnect(Stock);
