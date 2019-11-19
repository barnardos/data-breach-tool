import React from "react";
import PropTypes from "prop-types";

import { View, Text } from "@react-pdf/renderer";
import { questionsAndAnswers } from "../../data/questionsAndAnswers";

import styles from "./styles";

const renderFormField = (field, answers) => {
  const { headingThree, headingTwo } = styles;
  switch (field.type) {
    case "HeadingTwo":
      return (
        <Text {...field} key={field.id} style={headingThree}>
          {field.heading}
        </Text>
      );
    case "HeadingOne":
      return (
        <Text {...field} key={field.id} style={headingTwo}>
          {field.heading}
        </Text>
      );
    default:
      return QuestionAndAnswerOutput(answers[field.id], field);
  }
};

const getAnswer = (answer, answerMap) =>
  answer.value.length > 0 ? answerMap[answer.value] : answerMap.empty;

const hasDescription = answer => answer.additionalDescription.length > 0;

const QuestionAndAnswerOutput = (
  answer = { value: "", additionalDescription: "" },
  field
) => {
  const { answerMap } = questionsAndAnswers;
  const {
    innerSection,
    innerSectionLegend,
    innerSectionAnswer,
    paragraph,
    paragraph12,
    paragraphMB
  } = styles;

  return (
    <View key={field.id} style={innerSection} wrap={false}>
      <View style={innerSectionLegend}>
        <Text style={[paragraph12, paragraphMB]}>{field.legend}</Text>
        {hasDescription(answer) && (
          <Text style={paragraph}>{answer.additionalDescription}</Text>
        )}
      </View>
      <View style={innerSectionAnswer}>
        <Text style={paragraph}>{getAnswer(answer, answerMap)}</Text>
      </View>
    </View>
  );
};

const buildQuestionAnswer = (section, questionsAndAnswers, answers) => {
  const formFields = section.formFields;
  const { headingOne } = styles;

  return (
    <View key={section.id}>
      {formFields.length > 0 && (
        <Text id={section.id} style={headingOne}>
          {section.title}
        </Text>
      )}
      {formFields.length > 0 &&
        formFields.map(field => renderFormField(field, answers))}
    </View>
  );
};

buildQuestionAnswer.propTypes = {
  section: PropTypes.array,
  questionsAndAnswers: PropTypes.object,
  answers: PropTypes.object
};

QuestionAndAnswerOutput.propTypes = {
  answer: PropTypes.string,
  id: PropTypes.string,
  legend: PropTypes.string
};

export default buildQuestionAnswer;
