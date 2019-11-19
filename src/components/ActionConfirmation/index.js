import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../../components/Button";

import "./index.css";

class ActionConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedConfirmation: false
    };
    this.toggleConfirmation = this.toggleConfirmation.bind(this);
    this.renderConfirmation = this.renderConfirmation.bind(this);
  }

  toggleConfirmation = e => {
    e.preventDefault();
    this.setState({ requestedConfirmation: !this.state.requestedConfirmation });
  };

  renderConfirmation = (actionText, handleAction) => {
    let confirmation;

    if (this.state.requestedConfirmation) {
      confirmation = (
        <div className="ConfirmationSection ConfirmationSection--confirm">
          <p className="ConfirmationSection--title">{`Are you sure you want to "${actionText}"?`}</p>
          <Button handleClick={handleAction} text="YES" color="green" />
          <Button handleClick={this.toggleConfirmation} text="NO" color="red" />
        </div>
      );
    } else {
      confirmation = (
        <div className="ConfirmationSection">
          <Button
            handleClick={this.toggleConfirmation}
            text={actionText}
            color="red"
          />
        </div>
      );
    }
    return confirmation;
  };

  render() {
    const { actionText, handleAction } = this.props;

    return this.renderConfirmation(actionText, handleAction);
  }
}

ActionConfirmation.propTypes = {
  actionText: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired
};

export default ActionConfirmation;
