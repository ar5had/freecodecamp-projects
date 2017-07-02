import React, {Component} from 'react';
import './Graph.css';
import setTheme from '../../theme/theme.js';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import image from '../../images/stock.svg';

// applying theme
let Highcharts = ReactHighstock.Highcharts;
setTheme(Highcharts);

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: this.getHeight(),
      isLoading: true,
      data: []
    };
    this.config = {
      chart: {
        height: this.getHeight()
      },
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Stocks'
      },
      series: []
    };
  }

  getHeight() {
    return (window.innerHeight - 130);
  }

  getSeriesData(name, data, i) {
    return {
      name: name,
      type: "areaspline",
      data: data,
      tooltip: {
        valueDecimals: 2
      },
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
            [0,
            Highcharts.Color(Highcharts.getOptions().colors[i])
            .setOpacity(0.4).get('rgba')],
            [1,
            Highcharts.Color(Highcharts.getOptions().colors[i])
            .setOpacity(0).get('rgba')]
        ]
      }
    }
  }

  removeAllStock() {
    this.setState({
      data: [],
      isLoading: false
    });
  }

  addStock(data) {
    let newData = (this.state.data).concat([data]);
    if(newData.length > 10) {
      newData.shift();
    }
    this.setState({
      data: newData,
      isLoading: false
    });
  }

  // find a way to use color of removed stock
  removeStock(code) {
    this.setState({
      data: this.state.data.filter(elem => (elem.code !== code)),
      isLoading: false
    });
  }

  loadAllStocks(data) {
    this.setState({
      data: this.state.data.concat(data),
      isLoading: false
    });
  }

  changeState(actionObj, data) {
    this.setState({isLoading: true});
    const action = actionObj.action;
    setTimeout(() => {
      switch (action) {
        case "LOAD_ALL":
          this.loadAllStocks(data);
          break;
        case "ADD":
          this.addStock(data);
          break;
        case "REMOVE":
          this.removeStock(actionObj.code);
          break;
        case "REMOVE_ALL":
          this.removeAllStock();
          break;
        default:
          console.error("Unhandled action:", actionObj);
      }
    }, 500);
  }

  loadAllStocksConfig() {
    this.config.series = [];
    if(this.state.data.length > 0) {
      this.state.data.forEach((data, i) => {
        this.config.series.push(
          this.getSeriesData(data.code, data.data, i));
      });
    }
  }

  getContent() {
    if(this.state.isLoading) {
      return <div className="main-loader" />
    } else if(this.state.data.length > 0) {
      return <ReactHighstock config={this.config}
              domprops={{id: "graph"}} ref="chart"/>;
    } else {
      return  (<div className="noStockContent">
                <img src={image} alt="stock"/>
                <h2 className="noStockHeading">
                  No Stock added! To add stock, open sidemenu and add stock.
                </h2>
              </div>);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      // On Android mobile phones, focussed input will open keyboard
      // which will change viewport height
      if(document.activeElement !== document.querySelector(".searchInput")) {
        let height = this.getHeight();
        height = height > 270 ? height : 270;
        this.config.chart.height = height;
        if(this.state.height !== height) {
          this.setState({height: height});
        }
      }
    });
  }

  render() {
    this.loadAllStocksConfig();
    return (
      <div id="graph" className={this.props.classes}>
        {this.getContent()}
      </div>
    );
  }
}

export default Graph;
