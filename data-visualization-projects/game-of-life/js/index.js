"use strict";

// Component model
//
// Board
//  Logo
//  Controls
//   StartStop
//   Clear
//  Cells
//   Cell

var Board = React.createClass({
  displayName: "Board",

  updateDimensions: function updateDimensions() {
    this.setState({ width: $(window).width(), height: $(window).height() });
    this.refs.cells.screenResize();
  },
  componentDidMount: function componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  },
  playOrPause: function playOrPause(shouldPlay) {
    if (shouldPlay) this.refs.cells.startGame();else this.refs.cells.pauseGame();
  },
  clearBoard: function clearBoard() {
    this.refs.cells.resetCells();
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "board", id: "board" },
      React.createElement(
        "div",
        { id: "panel" },
        React.createElement(Logo, null),
        React.createElement(Controls, { clear: this.clearBoard, playOrPause: this.playOrPause })
      ),
      React.createElement(Cells, { ref: "cells" })
    );
  }
});

var Logo = React.createClass({
  displayName: "Logo",

  render: function render() {
    return React.createElement(
      "div",
      { id: "logoContainer" },
      React.createElement(
        "h3",
        { id: "logo" },
        "Game of ",
        React.createElement(
          "span",
          null,
          "Life"
        )
      )
    );
  }
});

var Controls = React.createClass({
  displayName: "Controls",

  render: function render() {
    return React.createElement(
      "div",
      { className: "controls", id: "controls" },
      React.createElement(
        "div",
        { className: "controlsContainer" },
        React.createElement(GenerationDisplay, null),
        React.createElement(StartStop, { onClick: this.props.playOrPause }),
        React.createElement(Clear, { onClick: this.props.clear })
      )
    );
  }
});

var GenerationDisplay = React.createClass({
  displayName: "GenerationDisplay",

  render: function render() {
    return React.createElement(
      "div",
      { className: "gDisplay col-xs-8" },
      React.createElement(
        "h4",
        { className: "generationText" },
        "Generation :",
        React.createElement(
          "span",
          { id: "count" },
          "000000"
        )
      )
    );
  }
});

var StartStop = React.createClass({
  displayName: "StartStop",

  onClick: function onClick(e) {
    $(".startstop").toggleClass("on");
    $(".startstop > span").toggleClass("glyphicon-pause");
    if ($(".startstop").hasClass("on")) this.props.onClick(true);else this.props.onClick(false);
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "btnContainer col-xs-2" },
      React.createElement(
        "button",
        { className: "startstop transition on", onClick: this.onClick },
        React.createElement("span", { className: "glyphicon glyphicon-play glyphicon-pause" })
      )
    );
  }
});

var Clear = React.createClass({
  displayName: "Clear",

  onClick: function onClick(e) {
    $(".startstop").removeClass("on");
    $(".startstop>span").removeClass("glyphicon-pause");
    this.props.onClick();
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "btnContainer col-xs-2" },
      React.createElement(
        "button",
        { className: "clear transition on", onClick: this.onClick },
        React.createElement("span", { className: "glyphicon glyphicon-stop" })
      )
    );
  }
});

var Cells = React.createClass({
  displayName: "Cells",

  getInitialState: function getInitialState() {
    this.getScreenDimensions();
    var cellStates = [];
    for (var i = 0; i < this.rows; i++) {
      cellStates[i] = [];
      for (var j = 0; j < this.cols; j++) {
        if (Math.random() > .5) cellStates[i][j] = true;else cellStates[i][j] = false;
      }
    }
    return { cellStates: cellStates };
  },
  componentDidMount: function componentDidMount() {
    this.startGame();
  },
  startGame: function startGame() {
    var parent_this = this;
    this.generationInterval = setInterval(function () {
      var count = $("#count").html();
      count = +count;
      count++;
      var zeros = 6 - String(count).length;
      var prefix = "";
      while (prefix.length < zeros) {
        prefix += "0";
      }$("#count").html(prefix + count);
      parent_this.updateCells();
    }, 100);
  },
  pauseGame: function pauseGame() {
    this.resetGeneration();
  },
  updateCells: function updateCells() {
    var cellStates = [];
    for (var i = 0; i < this.rows; i++) {
      cellStates.push([]);
      for (var j = 0; j < this.cols; j++) {
        var top = i > 0 ? i - 1 : this.rows - 1;
        var bottom = i < this.rows - 1 ? i + 1 : 0;
        var left = j > 0 ? j - 1 : this.cols - 1;
        var right = j < this.cols - 1 ? j + 1 : 0;
        // neighbours count
        var count = 0;
        //checking top
        if (this.state.cellStates[top][j]) count++;
        //checking bottom
        if (this.state.cellStates[bottom][j]) count++;
        //checking left
        if (this.state.cellStates[i][left]) count++;
        //checking right
        if (this.state.cellStates[i][right]) count++;
        //checking top-left
        if (this.state.cellStates[top][left]) count++;
        //checking top-right
        if (this.state.cellStates[top][right]) count++;
        //checking bottom-left
        if (this.state.cellStates[bottom][left]) count++;
        //checking bottom-right
        if (this.state.cellStates[bottom][right]) count++;

        if ((count === 2 || count === 3) && this.state.cellStates[i][j]) cellStates[i][j] = true;else if (count === 3 && !this.state.cellStates[i][j]) cellStates[i][j] = true;else cellStates[i][j] = false;
      }
    }
    if (document.querySelectorAll(".dead").length === this.rows * this.cols) $(".clear").click();else this.setState({ cellStates: cellStates });
  },
  clearCells: function clearCells() {
    var cellStates = [];
    for (var i = 0; i < this.rows; i++) {
      cellStates[i] = [];
      for (var j = 0; j < this.cols; j++) {
        cellStates[i][j] = false;
      }
    }
    this.setState({ cellStates: cellStates });
  },
  resetGeneration: function resetGeneration() {
    clearInterval(this.generationInterval);
  },
  getScreenDimensions: function getScreenDimensions() {
    var width = document.querySelector("body").offsetWidth;
    var height = document.querySelector("body").offsetHeight - 125;
    // if(document.querySelector(".cells")) { 
    //   document.querySelector(".cells").style.width = width;
    //   document.querySelector(".cells").style.height = height;
    // }  
    this.cols = Math.floor(width / 10);
    this.rows = Math.floor(height / 10);
  },
  resetCells: function resetCells() {
    this.resetGeneration();
    $("#count").html("000000");
    this.clearCells();
  },
  cellClicked: function cellClicked(row, col, val) {
    var cellStates = this.state.cellStates;
    cellStates[row][col] = val;
    this.setState({ cellStates: cellStates });
  },
  screenResize: function screenResize() {
    this.getScreenDimensions();
    var cellStates = [];
    for (var i = 0; i < this.rows; i++) {
      cellStates[i] = [];
      for (var j = 0; j < this.cols; j++) {
        if (Math.random() > .5) cellStates[i][j] = true;else cellStates[i][j] = false;
      }
    }
    this.setState({ cellStates: cellStates });
  },
  render: function render() {
    var cells = [];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.state.cellStates[i][j]) cells.push(React.createElement(Cell, { dead: false, row: i, col: j, onClick: this.cellClicked }));else cells.push(React.createElement(Cell, { dead: true, row: i, col: j, onClick: this.cellClicked }));
      }
    }
    return React.createElement(
      "div",
      { className: "cells", id: "cells" },
      cells
    );
  }
});

var Cell = React.createClass({
  displayName: "Cell",

  getClasses: function getClasses(str) {
    if (this.props.dead) return str + " dead";else return str;
  },
  onClick: function onClick(e) {
    $(e.currentTarget).toggleClass("dead");
    var row = e.currentTarget.getAttribute("data-row");
    var col = e.currentTarget.getAttribute("data-col");
    var val = $(e.currentTarget).hasClass("dead") ? false : true;
    this.props.onClick(row, col, val);
  },
  render: function render() {
    return React.createElement("div", { className: this.getClasses("cell transition"), onClick: this.onClick, "data-row": this.props.row, "data-col": this.props.col });
  }
});

ReactDOM.render(React.createElement(Board, null), document.getElementById("app"));