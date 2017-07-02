"use strict";

var Textbox = React.createClass({
  displayName: "Textbox",

  markup: function markup(text) {
    var md = new Remarkable();
    var html = md.render(text.toString());
    return { __html: html };
  },
  loadStringFromTextbox: function loadStringFromTextbox() {
    this.setState({ mdText: document.getElementById(this.props.source).value });
  },
  getInitialState: function getInitialState() {
    return { mdText: "" };
  },
  componentDidMount: function componentDidMount() {
    this.loadStringFromTextbox();
    setInterval(this.loadStringFromTextbox, this.props.interval);
  },
  render: function render() {
    return React.createElement("div", { className: "resultText", dangerouslySetInnerHTML: this.markup(this.state.mdText) });
  }
});

ReactDOM.render(React.createElement(Textbox, { source: "textarea", interval: 100 }), document.getElementById("result"));