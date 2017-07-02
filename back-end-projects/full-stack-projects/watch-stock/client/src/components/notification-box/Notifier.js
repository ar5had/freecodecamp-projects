import React, {Component} from 'react';
import {socketConnect} from 'socket.io-react';

import infoIcon from '../../images/info.svg';
import './Notifier.css';

class Notifier extends Component {
  constructor(props) {
    super(props);
    this.state = {show: false, msg: ''};
  }

  hide() {
    this.setState({
      show: false, msg: ''
    });
  }

  componentDidMount() {
    this.props.socket.on('notify', (msg) => {
      this.setState({
        show: true, msg: msg
      }, () => {
        setTimeout(() => {
          this.hide();
        }, 5500);
      });
    });
  }

  getContent() {
    return (<div className="notificationBox open">
              <img src={infoIcon} alt='🛈' />
              <p>{this.state.msg}</p>
            </div>);
  }

  render() {
    let content = null;
    if(this.state.show) {
      content = this.getContent();
    }
    return (
      content
    );
  }
}

export default socketConnect(Notifier);
