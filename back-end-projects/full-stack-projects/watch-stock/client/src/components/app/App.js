import React, {Component} from 'react';
import {socketConnect} from 'socket.io-react';

import Graph from '../stock-graph/Graph.js';
import Header from '../header/Header.js';
import Panel from '../stock-panel/Panel.js';
import Notifier from '../notification-box/Notifier.js';

import 'bootstrap-grid';
// syncronously load font first
require('../../fonts/Fonts.css');
import './App.css';

class App extends Component {

  updateGraph(actionObj, graphStateData) {
    this.graph.changeState(actionObj, graphStateData);
  }

  render() {
    return (
      <div className="wrapper row">
        <div className="headerWrapper row">
          <Header classes="col-xs-12" />
        </div>
        <div className="bodyWrapper row">
          <Graph ref={graph => this.graph = graph} classes="col-xs-12" />
        </div>
        <Panel updateGraph={this.updateGraph.bind(this)}/>
        <Notifier />
      </div>
    );
  }
}

export default socketConnect(App);
