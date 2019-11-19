import React, { Component } from "react";
import PropTypes from "prop-types";
import doConditionsPass from "../../utils/helpers";
import { sections } from "../../data/sections.json";
import { labels } from "../../data/app.json";
import { countries as choices } from "../../data/countries.json";

import BackLink from "../../components/BackLink";
import DateControl from "../../components/DateControl";
import Form from "../../components/Form";
import HeadingTwo from "../../components/HeadingTwo";
import HeadingOne from "../../components/HeadingOne";
import Layout from "../../components/Layout";
import OneOfManyChoiceControl from "../../components/OneOfManyChoiceControl";
import OneOfManyChoiceControlWithDescription from "../../components/OneOfManyChoiceControlWithDescription";
import Paragraph from "../../components/Paragraph";
import SelectOneOfManyChoiceControl from "../../components/SelectOneOfManyChoiceControl";
import SinglelineTextControl from "../../components/SinglelineTextControl";
import Steps from "../../components/Steps";
import Submit from "../../components/Submit";
import Title from "../../components/Title";

const nextSectionPath = (currentSection, sections) => {
  const currentSectionIndex = sections.indexOf(currentSection);

  return currentSectionIndex === sections.length - 1
    ? "/results"
    : `/section/${sections[currentSectionIndex + 1].id}`;
};

const previousSectionPath = (currentSection, sections) => {
  const currentSectionIndex = sections.indexOf(currentSection);

  return currentSectionIndex === 0
    ? "/"
    : `/section/${sections[currentSectionIndex - 1].id}`;
};

class SectionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        title: "",
        paragraph: "",
        formFields: []
      },
      nextPage: "",
      previousPage: "",
      answers: {},
      errors: {},
      currentSection: 0,
      totalNumberOfSections: 0,
      countries: choices
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    let currentSectionIdx = 0;

    const section = sections.find((section, index) => {
      currentSectionIdx = index + 1;
      return section.id === params.sectionId;
    });

    const sessionStorageRef = sessionStorage.getItem("assessment");
    let answers = { ...this.state.answers };

    if (!section) {
      this.props.history.replace("/404");
      return;
    }

    if (sessionStorageRef) {
      answers = {
        ...answers,
        ...JSON.parse(sessionStorageRef)
      };
    }

    window.scrollTo(0, 0);

    window.addEventListener("beforeunload", this.handleOnBeforeUnload);

    this.setState({
      answers: this.setNewAnswersState(answers, section),
      content: section,
      section: section,
      nextPage: nextSectionPath(section, sections),
      previousPage: previousSectionPath(section, sections),
      totalNumberOfSections: sections.length,
      currentSection: currentSectionIdx
    });
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match;
    let currentSectionIdx = 0;

    sessionStorage.setItem("assessment", JSON.stringify(this.state.answers));

    if (prevProps.match.params.sectionId !== params.sectionId) {
      const section = sections.find((section, index) => {
        currentSectionIdx = index + 1;
        return section.id === params.sectionId;
      });

      this.setState({
        answers: this.setNewAnswersState({ ...this.state.answers }, section),
        content: section,
        nextPage: nextSectionPath(section, sections),
        previousPage: previousSectionPath(section, sections),
        totalNumberOfSections: sections.length,
        currentSection: currentSectionIdx
      });
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleOnBeforeUnload);
  }

  handleOnBeforeUnload = e => {
    (e || window.event).returnValue = "";
  };

  checkValidation = () => {
    const requiredFields = this.state.content.formFields.filter(
      ({ required }) => required
    );

    let errors = {};

    const emptyRequiredFields = requiredFields.filter(
      ({ id }) => !this.state.answers[id].value
    );

    if (emptyRequiredFields.length > 0) {
      errors = Object.assign(
        ...emptyRequiredFields.map(field => ({ [field.id]: true }))
      );
    }

    this.setState({
      errors
    });

    return emptyRequiredFields.length < 1;
  };

  handleChange = (event, type = null) => {
    const { target } = event;
    let answers = { ...this.state.answers };
    let errors = { ...this.state.errors };

    if (
      type === "OneOfManyChoiceControlWithDescription" &&
      target.type === "text"
    ) {
      answers[target.name].additionalDescription = target.value;
    } else {
      answers[target.name].value = target.value;
    }

    if (target.required && this.state.errors[target.name]) {
      errors[target.name] = false;
    }

    this.setState({ answers, errors });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.checkValidation()) {
      this.props.history.push(this.state.nextPage);
    }
  };

  getSubmitButtonText = () =>
    this.isLastStep() ? labels.completeAssessment : labels.continue;

  isLastStep = () =>
    this.state.currentSection === this.state.totalNumberOfSections;

  setNewAnswersState = (answers, section) =>
    Object.assign(
      ...section.formFields.map(field => {
        switch (field.type) {
          case "DateControl":
            return {
              [`${field.id}-day`]: { value: "", tags: field.tags },
              [`${field.id}-month`]: { value: "", tags: field.tags },
              [`${field.id}-year`]: { value: "", tags: field.tags }
            };

          case "OneOfManyChoiceControlWithDescription":
            return {
              [field.id]: {
                value: "",
                tags: field.tags,
                additionalDescription: field.additionalDescription
              }
            };

          default:
            return {
              [field.id]: { value: "", tags: field.tags }
            };
        }
      }),
      answers
    );

  renderFormField = field => {
    const { answers, errors } = this.state;
    if (field.conditions && !doConditionsPass(field.conditions, answers)) {
      return false;
    }

    switch (field.type) {
      case "DateControl":
        return (
          <DateControl
            {...field}
            key={field.id}
            dayValue={answers[`${field.id}-day`].value}
            monthValue={answers[`${field.id}-month`].value}
            yearValue={answers[`${field.id}-year`].value}
            handleChange={e => this.handleChange(e, field.type)}
          />
        );
      case "HeadingTwo":
        return (
          <HeadingTwo {...field} key={field.id}>
            {field.heading}
          </HeadingTwo>
        );
      case "HeadingOne":
        return (
          <HeadingOne {...field} key={field.id}>
            {field.heading}
          </HeadingOne>
        );
      case "OneOfManyChoiceControl":
        return (
          <OneOfManyChoiceControl
            {...field}
            checkedValue={answers[field.name].value}
            type="one"
            key={field.id}
            handleChange={e => this.handleChange(e, field.type)}
            invalid={errors[field.id]}
          />
        );
      case "OneOfManyChoiceControlWithDescription":
        return (
          <OneOfManyChoiceControlWithDescription
            {...field}
            checkedValue={answers[field.name].value}
            additionalDescription={answers[field.name].additionalDescription}
            type="one"
            key={field.id}
            handleChange={e => this.handleChange(e, field.type)}
            invalid={errors[field.id]}
          />
        );
      case "SelectOneOfManyChoiceControl":
        // now that's a nasty hack but the bus is coming... it helps with the CountryDetails separation
        // JSON split
        if (field.id === "country") field.choices = this.state.countries;

        return (
          <SelectOneOfManyChoiceControl
            {...field}
            key={field.id}
            handleChange={e => this.handleChange(e, field.type)}
            selectedChoice={answers[field.id].value}
            invalid={errors[field.id]}
          />
        );
      case "SinglelineTextControl":
        return (
          <SinglelineTextControl
            {...field}
            value={answers[field.id].value}
            key={field.id}
            handleChange={e => this.handleChange(e, field.type)}
          />
        );
      default:
        return null;
    }
  };

  showConfirmation = e => {
    if (
      this.state.previousPage === "/" &&
      !window.confirm(labels.moveAwayMessage)
    )
      e.preventDefault();
  };

  render() {
    const {
      previousPage,
      content: { title, paragraph, formFields },
      currentSection,
      totalNumberOfSections
    } = this.state;

    return (
      <Layout>
        <BackLink to={previousPage} onClick={this.showConfirmation} />
        <Steps
          currentSection={currentSection}
          totalNumberOfSections={totalNumberOfSections}
        />
        <Title>{title}</Title>
        <Paragraph>{paragraph}</Paragraph>
        <Form>
          {formFields.map(this.renderFormField)}
          <Submit
            text={this.getSubmitButtonText()}
            handleClick={this.handleSubmit}
          />
        </Form>
      </Layout>
    );
  }
}

SectionPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default SectionPage;
