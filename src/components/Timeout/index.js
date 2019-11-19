import React, { Component } from "react";
import Dialog from "../../components/Dialog";
import PropTypes from "prop-types";

export default ComposedClass => {
  return class Timeout extends Component {
    static propTypes = { history: PropTypes.object };
    constructor(props) {
      super(props);
      this.state = {
        // 15mins
        warningTime: 1000 * 60 * 15,
        // 20mins
        resetTime: 1000 * 60 * 20,
        dialogVisible: false,
        events: [
          "load",
          "mousemove",
          "mousedown",
          "click",
          "scroll",
          "keypress"
        ]
      };
    }

    componentDidMount() {
      for (let i in this.state.events) {
        window.addEventListener(this.state.events[i], this.resetTimeout);
      }

      this.resetTimeout();
    }

    componentWillUnmount() {
      for (let i in this.state.events) {
        window.removeEventListener(this.state.events[i], this.resetTimeout);
      }

      this.clearTimeoutFunc();
    }

    clearTimeoutFunc = () => {
      if (this.warnTimeout) clearTimeout(this.warnTimeout);
      if (this.destroyTimeout) clearTimeout(this.destroyTimeout);
    };

    setTimeout = () => {
      this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
      this.destroyTimeout = setTimeout(this.reset, this.state.resetTime);
    };

    resetTimeout = () => {
      this.clearTimeoutFunc();
      this.setTimeout();
    };

    handleCloseDialog = () => {
      this.setState({ dialogVisible: false });
    };

    warn = () => {
      this.setState({ dialogVisible: true });
    };

    reset = () => {
      this.setState({ dialogVisible: false });
      this.destroy();
    };

    destroy = () => {
      this.props.history.push("/");
    };

    render() {
      return (
        <React.Fragment>
          {this.state.dialogVisible && (
            <Dialog onClose={this.handleCloseDialog} />
          )}
          <ComposedClass {...this.props} />
        </React.Fragment>
      );
    }
  };
};
