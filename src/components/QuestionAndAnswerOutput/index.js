import PropTypes from "prop-types";
import React from "react";

import { questionsAndAnswers } from "../../data/questionsAndAnswers";
import Paragraph from "../Paragraph";

import "./index.css";

const getAnswer = (answer, answerMap) =>
  answer.value.length > 0 ? answerMap[answer.value] : answerMap.empty;

const hasDescription = answer => answer.additionalDescription.length > 0;

const QuestionAndAnswerOutput = ({
  answer = { value: "", additionalDescription: "" },
  id,
  legend
}) => {
  const { answerMap } = questionsAndAnswers;

  return (
    <div key={id} className="QuestionAndAnswerOutput">
      <div className="QuestionAndAnswerOutput-question">
        <Paragraph>{`**${legend}**`}</Paragraph>
        {hasDescription(answer) && (
          <Paragraph>{answer.additionalDescription}</Paragraph>
        )}
      </div>
      <div className="QuestionAndAnswerOutput-answer">
        <span>{getAnswer(answer, answerMap)}</span>
      </div>
    </div>
  );
};

QuestionAndAnswerOutput.propTypes = {
  id: PropTypes.string.isRequired,
  legend: PropTypes.string,
  answer: PropTypes.shape({
    value: PropTypes.string,
    additionalDescription: PropTypes.string
  })
};

export default QuestionAndAnswerOutput;
