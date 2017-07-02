"use strict";

var Board = React.createClass({
  displayName: "Board",

  render: function render() {
    return React.createElement(
      "div",
      { className: "container board" },
      React.createElement(
        "h3",
        { className: "heading text-center" },
        "freeCodeCamp Leaderboard"
      ),
      React.createElement(Table, null)
    );
  }
});

var Table = React.createClass({
  displayName: "Table",

  render: function render() {
    return React.createElement(
      "div",
      { className: "mainTable" },
      React.createElement(DataRows, null)
    );
  }
});

var DataRows = React.createClass({
  displayName: "DataRows",

  getData: function getData() {
    var react_this = this;
    $.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent", function (data, status) {
      react_this.sortData(data, "recent");
      console.log("Status for recent list:", status);
    });
    $.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", function (data, status) {
      react_this.sortData(data, "alltime");
      console.log("Status for all time list:", status);
    });
  },
  sortData: function sortData(data, sortDataType) {
    if (sortDataType === "recent") {
      var sortedData = data.sort(function (a, b) {
        return b.recent - a.recent;
      });
      this.setState({ recentList: sortedData });
    } else if (sortDataType === "alltime") {
      var sortedData = data.sort(function (a, b) {
        return b.alltime - a.alltime;
      });
      this.setState({ allTimeList: sortedData });
    }
  },
  getInitialState: function getInitialState() {
    return { show: "alltime", recentList: [], allTimeList: [] };
  },
  componentDidMount: function componentDidMount() {
    this.getData();
  },
  updateState: function updateState(e) {
    $(".active").removeClass("active");
    this.setState({ show: e.target.dataset.value });
    if (e.target.dataset.value === "recent") $(".recentPoints").addClass("active");else if (e.target.dataset.value === "alltime") $(".allTimePoints").addClass("active");
  },
  render: function render() {
    var rows = [];
    if (this.state.show === "recent") {
      this.state.recentList.forEach(function (elem, i) {
        rows.push(React.createElement(Row, { index: i + 1, name: elem.username, lastMonthPoints: elem.recent,
          totalPoints: elem.alltime, imgLink: elem.img, type: "dataRow" }));
      });
    } else {
      this.state.allTimeList.forEach(function (elem, i) {
        rows.push(React.createElement(Row, { index: i + 1, name: elem.username, lastMonthPoints: elem.recent,
          totalPoints: elem.alltime, imgLink: elem.img, type: "dataRow" }));
      });
    }
    return React.createElement(
      "div",
      { className: "dataRows" },
      React.createElement(CategoryRow, { updateState: this.updateState }),
      rows
    );
  }
});

var CategoryRow = React.createClass({
  displayName: "CategoryRow",

  render: function render() {
    return React.createElement(Row, { index: "#", name: "Camper", lastMonthPoints: "Recent points",
      totalPoints: "Total points", type: "category", imgLink: "", changeState: this.props.updateState });
  }
});

var Row = React.createClass({
  displayName: "Row",

  getClasses: function getClasses(classes) {
    return classes + " " + this.props.type;
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: this.getClasses("col-xs-1") },
        React.createElement(
          "p",
          null,
          this.props.index
        )
      ),
      React.createElement(
        "div",
        { className: this.getClasses("col-xs-5 campers") },
        React.createElement(
          "p",
          null,
          React.createElement(
            "span",
            null,
            React.createElement("img", { src: this.props.imgLink, className: "userImg" })
          ),
          this.props.name
        )
      ),
      React.createElement(
        "div",
        { className: this.getClasses("col-xs-3 recentPoints"), "data-value": "recent", onClick: this.props.changeState },
        React.createElement(
          "p",
          { "data-value": "recent" },
          this.props.lastMonthPoints
        )
      ),
      React.createElement(
        "div",
        { className: this.getClasses("col-xs-3 allTimePoints active"), "data-value": "alltime", onClick: this.props.changeState },
        React.createElement(
          "p",
          { "data-value": "alltime" },
          this.props.totalPoints
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Board, null), document.getElementById("app"));