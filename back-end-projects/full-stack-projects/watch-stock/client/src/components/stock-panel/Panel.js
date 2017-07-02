import React, { Component } from 'react';
import {socketConnect} from 'socket.io-react';
import SearchBar from '../search-bar/SearchBar';
import Stocks from '../stocks/Stocks';
import './Panel.css';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      stocks: []
    };
  }

  changeState(panelStateData, changeGraphState, actionObj, graphStateData) {
    this.setState({
      stocks: panelStateData
    },() => {
      if(changeGraphState) {
        this.props.updateGraph(actionObj, graphStateData);
      }
    });
  }

  getInitStocks() {
    fetch('/stock/getAllStock', {
      method: 'get'
    }).then(response => {
      return response.json();
    }).then(data => {
      const panelStateData = data.map(elem =>
                              ({description: elem.name, code: elem.code,
                                id: elem.id, hide: elem.hide}));
      this.changeState(panelStateData, true,
                      {action: "LOAD_ALL"}, data);
    }).catch(err => {
      console.error("Error happened while making /stock/getAllStock req:", err);
    });
  }

  addStock(data) {
    let newState = [{code: data.code, description: data.name, id: data.id, hide: data.hide}];
    newState = newState.concat(this.state.stocks);
    // graph state must change on addition of each stock
    this.changeState(newState, true, {action: "ADD"}, data);
  }

  removeAllStock() {
    console.log(this.allStocks);
    this.allStocks.removeAllStock();
  }

  componentWillMount() {
    this.getInitStocks();
    this.props.socket.on("addStock", (data) => { this.addStock(data) })
  }

  render() {
    return (
      <div id="panel" className={this.props.classes}>
        <h3 className="panel">Add/Remove Stocks</h3>

        <SearchBar addStock={this.addStock.bind(this)}
          removeAllStock={this.removeAllStock.bind(this)}
          stockList={this.state.stocks.map(elem => elem.code)}/>

        <Stocks changeParentState={this.changeState.bind(this)}
          stocks={this.state.stocks} />

      </div>
    );
  }
}

export default socketConnect(Panel);
