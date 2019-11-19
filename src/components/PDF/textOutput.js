import React from "react";
import PropTypes from "prop-types";

import { View, Text } from "@react-pdf/renderer";
import { questionsAndAnswers } from "../../data/questionsAndAnswers";
import { excludeReasonsFromResults } from "../../data/app";
import { shouldIncludeReason, extractLinkText } from "../../utils/helpers";

import styles from "./styles";

const splitOutput = output => output.split("<br /><br />");

const renderReason = (reason, idx) => {
  const reasonExplanation = `${reason.legend} - ${
    reason.value.length > 0 ? reason.value : questionsAndAnswers.answerMap.empty
  }`;

  let reasonStyles =
    idx === 0
      ? [styles.paragraph, styles.paragraphReason]
      : [styles.paragraph, styles.paragraphMT4];

  return (
    <Text key={Math.random() + `${reason.id}`} style={reasonStyles}>
      * {reasonExplanation}
    </Text>
  );
};

const renderOutput = (output, idx) => {
  let outputStyles =
    idx === 0
      ? [styles.result, styles.paragraph]
      : [styles.result, styles.paragraph, styles.paragraphMT12];

  return (
    <Text style={outputStyles} key={Math.random() + `${idx}`}>
      {output}
    </Text>
  );
};

const buildTextOutput = ({ id, level, output, reasons }, sectionId) => (
  <View key={id} wrap={false} style={[styles.output, styles[level]]}>
    {splitOutput(extractLinkText(output)).map((output, idx) =>
      renderOutput(output, idx)
    )}

    {reasons &&
      reasons.length > 0 &&
      reasons.map(
        (reason, idx) =>
          shouldIncludeReason(
            sectionId,
            reason.value,
            excludeReasonsFromResults
          ) && renderReason(reason, idx)
      )}
  </View>
);

buildTextOutput.propTypes = {
  id: PropTypes.text,
  level: PropTypes.text,
  output: PropTypes.object,
  reasons: PropTypes.array
};

export default buildTextOutput;
