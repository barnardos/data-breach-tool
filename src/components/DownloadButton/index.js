import React from "react";
import PropTypes from "prop-types";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { labels, pdfFileName } from "../../data/app.json";

import "./index.css";

const DownloadButton = ({ document }) => {
  return (
    <div>
      <PDFDownloadLink
        document={document}
        fileName={`${pdfFileName}.pdf`}
        className="Download"
      >
        {({ loading }) => {
          return loading ? labels.creatingPdf : labels.download;
        }}
      </PDFDownloadLink>
    </div>
  );
};

DownloadButton.propTypes = {
  document: PropTypes.node.isRequired
};

export default DownloadButton;
