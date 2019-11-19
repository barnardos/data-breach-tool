import React from "react";
import PropTypes from "prop-types";
import { compiler } from "markdown-to-jsx";

import buildCountryData from "./countryInformationOutput";
import buildTextOutput from "./textOutput";
import buildQuestionAnswer from "./questionAndAnswersOutput";
import buildTableOutput from "./tableOutput";
import DownloadButton from "../../components/DownloadButton";
import Logo from "./logo";
import fgmLogo from "../../images/logos";

import styles from "./styles";

import { Document, Page, View, Text, Font } from "@react-pdf/renderer";

Font.registerHyphenationCallback(words => words.map(word => [word]));

const renderOutput = (output, sectionId) => {
  const { outputType, data, columns, tableFromTagTotals } = output;
  switch (outputType) {
    case "text":
      return buildTextOutput(output, sectionId);
    case "descriptionList":
      return buildCountryData(data);
    case "tableFromTagTotals":
      return buildTableOutput(data, columns, tableFromTagTotals);
    default:
      return null;
  }
};

const Pdf = ({
  sections,
  answers,
  resultsPage,
  questionsAndAnswers,
  questionsAnswersAndDescriptions
}) => {
  const {
    page,
    mainView,
    paragraph,
    headingOne,
    title,
    section,
    pagination
  } = styles;

  const compiledMarkdownParagraph = resultsPage.paragraph
    ? compiler(resultsPage.paragraph).props.children
    : "";

  const document = (
    <Document>
      <Page style={page}>
        <View style={mainView}>
          <Logo image={fgmLogo} />
          <Text style={title}>{resultsPage.title}</Text>
          <Text style={paragraph}>{compiledMarkdownParagraph}</Text>
          {sections.map(({ heading, id, outputs }) => {
            if (outputs.length > 0) {
              return (
                <View style={section} key={id}>
                  <Text style={headingOne}>{heading}</Text>
                  <View>{outputs.map(output => renderOutput(output, id))}</View>
                </View>
              );
            }

            return null;
          })}
          <View style={section}>
            <Text style={headingOne}>Questions and answers</Text>
            {questionsAnswersAndDescriptions.map(section =>
              buildQuestionAnswer(section, questionsAndAnswers, answers)
            )}
          </View>
        </View>
        <Text
          style={pagination}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );

  return <DownloadButton document={document} />;
};

Pdf.propTypes = {
  sections: PropTypes.array,
  answers: PropTypes.object,
  resultsPage: PropTypes.object,
  questionsAndAnswers: PropTypes.object,
  questionsAnswersAndDescriptions: PropTypes.array
};

export default Pdf;
