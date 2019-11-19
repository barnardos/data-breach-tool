import PropTypes from "prop-types";
import React from "react";

import Paragraph from "../Paragraph";
import HeadingFour from "../HeadingFour";

import { labels } from "../../data/app.json";

import "./index.css";

const Dialog = ({ onClose }) => (
  <div className="Dialog">
    <div className="Dialog--content">
      <div className="Dialog--close" onClick={onClose}>
        <svg viewBox="0 0 40 40">
          <path
            className="Dialog--closeIcon"
            d="M 10,10 L 30,30 M 30,10 L 10,30"
          />
        </svg>
      </div>
      <HeadingFour>{labels.idleWarningHeader}</HeadingFour>
      <Paragraph>{labels.idleWarningMessage}</Paragraph>
    </div>
  </div>
);

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Dialog;
