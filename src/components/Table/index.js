import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const Table = ({ data, columns, resultsTableData }) => {
  return (
    <table className="Table">
      <thead className="Table-thead">
        <tr className="Table-tr">
          {columns.map(column => (
            <th className="Table-th" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="Table-tbody">
        {data.map(({ rowName, rowTags, rowParentTag }) => (
          <tr className="Table-tr" key={rowName}>
            <td className="Table-td">{rowName}</td>
            {rowTags.map(
              column =>
                column.length > 0 ? (
                  <td
                    className={`Table-td ${rowParentTag}-${column}`}
                    key={column + Math.random()}
                    data-label={column}
                  >
                    {resultsTableData[rowParentTag][column] || "0"}
                  </td>
                ) : null
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  resultsTableData: PropTypes.object
};

export default Table;
