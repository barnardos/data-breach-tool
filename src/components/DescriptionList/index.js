import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const DescriptionList = ({ data }) => {
  return (
    <dl className="DescriptionList">
      {data.map(row => (
        <React.Fragment key={row[0]}>
          <dt className="DescriptionList-term">{row[0]}:</dt>
          <dd className="DescriptionList-description">{row[1]}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
};

DescriptionList.propTypes = {
  data: PropTypes.array.isRequired
};

export default DescriptionList;
