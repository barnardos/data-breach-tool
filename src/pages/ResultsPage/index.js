import React, { Component } from "react";
import PropTypes from "prop-types";

import { resultsPage } from "../../data/resultsPage.json";
import { sections as sectionsData } from "../../data/sections.json";
import doConditionsPass, {
  getQuestionAnswerReasons,
  isNode,
  mergeDeep
} from "../../utils/helpers";
import { questionsAndAnswers } from "../../data/questionsAndAnswers.json";

import HeadingOne from "../../components/HeadingOne";
import QuestionAndAnswer from "../../components/QuestionAndAnswer";
import Layout from "../../components/Layout";
import Output from "../../components/Output";
import Table from "../../components/Table";
import CountryDetails from "../../components/CountryDetails";
import Paragraph from "../../components/Paragraph";
import Title from "../../components/Title";
import AttentionGrabbingLink from "../../components/AttentionGrabbingLink";
import BackLink from "../../components/BackLink";
import ActionConfirmation from "../../components/ActionConfirmation";
import Collapsible from "../../components/Collapsible";
import SelectOneOfManyChoiceControl from "../../components/SelectOneOfManyChoiceControl";

import Pdf from "../../components/PDF";

import "./index.css";

class ResultsPage extends Component {
  constructor(props) {
    super(props);

    const sessionStorageRef =
      JSON.parse(sessionStorage.getItem("assessment")) || {};

    const questionsAndAnswers = this.getQuestionsAndAnswers();
    const { sections } = resultsPage;

    this.state = {
      sections: sections.map(({ heading, id, type = null, outputs }) => ({
        heading,
        id,
        type,
        outputs: outputs
          .map(output => {
            if (output.outputType === "text") {
              return this.testOutputAgainstConditions(
                output,
                sessionStorageRef
              );
            } else {
              return output;
            }
          })
          .filter(output => output)
          .map(output => {
            switch (output.outputType) {
              case "text":
                output.reasons = [];

                getQuestionAnswerReasons(
                  output.conditions,
                  questionsAndAnswers
                ).map(reason => {
                  if (output.reasons.findIndex(e => e.id === reason.id) === -1)
                    output.reasons = [...output.reasons, reason];
                  return false;
                });
                break;

              case "tableFromTagTotals":
                output.tableFromTagTotals = this.buildResultsTableData(
                  sections
                );
                break;

              default:
                break;
            }

            return output;
          })
      })),
      previousPage: `/section/${sectionsData[sectionsData.length - 1].id}`,
      answers: sessionStorageRef,
      questionsAnswersAndDescriptions: sectionsData.map(
        ({ paragraph, id, title, formFields }) => ({
          paragraph,
          id,
          title,
          formFields: formFields
            .map(field => {
              if (field.conditions) {
                if (doConditionsPass(field.conditions, sessionStorageRef)) {
                  if (sessionStorageRef[field.id])
                    field["value"] = sessionStorageRef[field.id].value;
                  return field;
                }
              } else if (!field.hideFromQuestionsAndAnswers) {
                if (sessionStorageRef[field.id])
                  field["value"] = sessionStorageRef[field.id].value;
                return field;
              }
              return false;
            })
            .filter(field => field)
        })
      ),
      questionsAndAnswers,
      questionsAndAnswersSelect: { selectedChoice: "all" }
    };

    this.resetApp = this.resetApp.bind(this);
    this.handleOnBeforeUnload = this.handleOnBeforeUnload.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener("beforeunload", this.handleOnBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleOnBeforeUnload);
  }

  handleOnBeforeUnload = e => {
    (e || window.event).returnValue = "";
  };

  testOutputAgainstConditions = (output, answers) => {
    return doConditionsPass(output.conditions, answers) ? output : false;
  };

  buildResultsTableData = sections => {
    const tableCounts = this.getTaggedYesAnswers(this.getAnswers());
    let resultsTableData = sections.find(section => section.type === "table");
    let resultsTable = {};

    if (resultsTableData) {
      resultsTableData = resultsTableData.outputs[0].data;
    } else {
      return {};
    }

    resultsTableData.forEach(({ rowParentTag, rowTags }) => {
      resultsTable[rowParentTag] = {};

      rowTags.forEach(tag => {
        resultsTable[rowParentTag][tag] = null;
        resultsTable[tag] = null;
      });
    });

    if (tableCounts.length > 0) {
      tableCounts.forEach(({ tags }) => {
        if (tags.length > 1) {
          ++resultsTable[tags[0]][tags[1]];
          ++resultsTable["total"][tags[1]];
        } else {
          ++resultsTable["total"][tags[0]];
        }
      });
    }
    return resultsTable;
  };

  getTaggedYesAnswers = answers => {
    const answeredYes = Object.entries(answers)
      .map(answer => answer[1])
      .filter(
        answer =>
          answer.value.length > 0 &&
          answer.value === "yes" &&
          answer.tags &&
          answer.tags.length > 0
      );

    return answeredYes;
  };

  getAnswers = () => JSON.parse(sessionStorage.getItem("assessment")) || {};

  getQuestions = () =>
    sectionsData
      .reduce((sections, section) => [...sections, ...section.formFields], [])
      .reduce(
        (questions, question) => ({ ...questions, [question.id]: question }),
        {}
      );

  getQuestionsAndAnswers = () => {
    const answers = this.getAnswers() || [];
    const questions = this.getQuestions() || [];
    let questionsAndAnswers = {};

    Object.keys(answers).forEach(function(key) {
      questionsAndAnswers[key] = mergeDeep(questions[key], answers[key]);
    });

    return questionsAndAnswers || {};
  };

  renderQuestionAnswer = section => {
    if (section.id === "report-details") return null;

    const {
      questionsAndAnswersSelect: { selectedChoice }
    } = this.state;
    const { filterMap } = questionsAndAnswers;
    const filteredSection = Object.assign({}, section);

    const filteredFormFields = section.formFields.filter(formField => {
      return filterMap[selectedChoice] === "all"
        ? true
        : filterMap[selectedChoice] === formField.value;
    });

    filteredSection.formFields = filteredFormFields;

    return (
      <QuestionAndAnswer
        key={section.id}
        {...filteredSection}
        answers={this.state.answers}
      />
    );
  };

  handleQnAFilterChange = e => {
    this.setState({
      questionsAndAnswersSelect: { selectedChoice: e.target.value }
    });
  };

  renderQuestionAnswerSelect = () => {
    const { filterOptions } = questionsAndAnswers;

    return (
      <div className="ResultsPage-qnAFilter">
        <SelectOneOfManyChoiceControl
          {...filterOptions}
          key={filterOptions.id}
          handleChange={this.handleQnAFilterChange}
          selectedChoice={this.state.questionsAndAnswersSelect.selectedChoice}
        />
      </div>
    );
  };

  renderOutput = (
    {
      id,
      level,
      output,
      outputType,
      reasons,
      data,
      columns,
      tableFromTagTotals
    },
    sectionId
  ) => {
    switch (outputType) {
      case "text":
        return (
          <Output
            level={level}
            key={id}
            output={output}
            reasons={reasons}
            sectionId={sectionId}
          />
        );
      case "tableFromTagTotals":
        return (
          <Table
            key={id}
            data={data}
            columns={columns}
            resultsTableData={tableFromTagTotals}
          />
        );
      case "descriptionList":
        return <CountryDetails key={id} data={data} />;
      default:
        return null;
    }
  };

  resetApp = event => {
    event.preventDefault();
    sessionStorage.removeItem("assessment");
    this.props.history.replace("/");
  };

  render() {
    const {
      previousPage,
      sections,
      questionsAndAnswers,
      questionsAnswersAndDescriptions
    } = this.state;

    return (
      <Layout>
        {!isNode() && (
          <Pdf
            sections={sections}
            answers={this.state.answers}
            resultsPage={resultsPage}
            questionsAndAnswers={questionsAndAnswers}
            questionsAnswersAndDescriptions={questionsAnswersAndDescriptions}
          />
        )}
        <BackLink to={previousPage} />
        <Title>{resultsPage.title}</Title>
        <Paragraph>{resultsPage.paragraph}</Paragraph>
        {sections.map(
          ({ heading, id, outputs }) =>
            outputs.length > 0 ? (
              <div className="ResultsPage-section" key={id}>
                <HeadingOne>{heading}</HeadingOne>
                <div className="ResultsPage-outputs">
                  {outputs.map(output => this.renderOutput(output, id))}
                </div>
              </div>
            ) : null
        )}
        <div className="ResultsPage-section">
          <Collapsible label="View questions and answers">
            {this.renderQuestionAnswerSelect()}
            {questionsAnswersAndDescriptions.map(this.renderQuestionAnswer)}
          </Collapsible>
        </div>
        <div className="ResultsPage-section">
          <AttentionGrabbingLink
            color="black"
            href="http://nationalfgmcentre.org.uk/fgm-assessment-tool"
            target="_blank"
            text="Go to Guidance"
          />
          <ActionConfirmation
            actionText="Erase and Start Again"
            handleAction={this.resetApp}
          />
        </div>
      </Layout>
    );
  }
}

ResultsPage.propTypes = {
  history: PropTypes.object
};

export default ResultsPage;
