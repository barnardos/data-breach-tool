import PropTypes from "prop-types";
import React from "react";
import Markdown from "markdown-to-jsx";

import { questionsAndAnswers } from "../../data/questionsAndAnswers";
import { excludeReasonsFromResults } from "../../data/app";
import { shouldIncludeReason } from "../../utils/helpers";

import ListItem from "../ListItem";
import UnorderedList from "../UnorderedList";

import "./index.css";

const renderReason = reason => {
  const reasonExplanation = `${reason.legend} - ${
    reason.value.length > 0 ? reason.value : questionsAndAnswers.answerMap.empty
  }`;

  return (
    <ListItem key={Math.random() + `${reason.id}`}>
      <Markdown>{reasonExplanation}</Markdown>
    </ListItem>
  );
};

const Output = ({ output, level, reasons, sectionId }) => {
  return (
    <div className={`Output Output--${level}`}>
      <Markdown options={{ forceBlock: true }}>{output}</Markdown>
      {reasons.length > 0 && (
        <UnorderedList>
          {reasons.map(
            reason =>
              shouldIncludeReason(
                sectionId,
                reason.value,
                excludeReasonsFromResults
              ) && renderReason(reason)
          )}
        </UnorderedList>
      )}
    </div>
  );
};

Output.propTypes = {
  reasons: PropTypes.array,
  level: PropTypes.string,
  output: PropTypes.string,
  sectionId: PropTypes.string
};

export default Output;
