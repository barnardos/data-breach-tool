import PropTypes from "prop-types";
import React from "react";

import { View, Text, Font } from "@react-pdf/renderer";

import styles from "./styles";

Font.registerHyphenationCallback(words => words.map(word => [word]));

const buildTableOutput = (data, columns, tableFromTagTotals) => {
  return (
    <View key="Table" wrap={false}>
      <View style={styles.table.tr}>
        {columns.map((column, idx) => {
          return (
            <Text
              key={column}
              style={[
                styles.table.base,
                idx ? styles.table.th : styles.table.first
              ]}
            >
              {column}
            </Text>
          );
        })}
      </View>

      {data.map(({ rowName, rowTags, rowParentTag }, idx) => (
        <View
          key={rowName}
          style={[
            styles.table.tr,
            idx % 2 ? null : styles.table.baseBackground
          ]}
        >
          <Text style={[styles.table.base, styles.table.first]}>{rowName}</Text>
          {rowTags.map(
            column =>
              column.length > 0 ? (
                <Text
                  key={column + Math.random()}
                  style={[styles.table.base, styles.table.td]}
                >
                  {tableFromTagTotals[rowParentTag][column] || "0"}
                </Text>
              ) : null
          )}
        </View>
      ))}
    </View>
  );
};

buildTableOutput.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  tableFromTagTotals: PropTypes.object
};

export default buildTableOutput;
