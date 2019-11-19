import React from "react";
import { shallow } from "enzyme";

import SectionPage from "./index";
import {
  failingConditionAnswer,
  passingConditionAnswer
} from "../../utils/testHelpers";
import { sections } from "../../data/sections.json";

import BackLink from "../../components/BackLink";
import DateControl from "../../components/DateControl";
import Form from "../../components/Form";
import HeadingOne from "../../components/HeadingOne";
import OneOfManyChoiceControl from "../../components/OneOfManyChoiceControl";
import Steps from "../../components/Steps";
import SelectOneOfManyChoiceControl from "../../components/SelectOneOfManyChoiceControl";
import OneOfManyChoiceControlWithDescription from "../../components/OneOfManyChoiceControlWithDescription";
import SinglelineTextControl from "../../components/SinglelineTextControl";
import Submit from "../../components/Submit";
import Title from "../../components/Title";

jest.mock("react-router-dom");

const formFieldComponents = {
  DateControl,
  HeadingOne,
  OneOfManyChoiceControl,
  SelectOneOfManyChoiceControl,
  OneOfManyChoiceControlWithDescription,
  SinglelineTextControl
};

sections.forEach((section, index, sections) => {
  describe(`renders conditional content for "${section.id}" section`, () => {
    const componentProps = {
      match: {
        params: {
          sectionId: section.id
        }
      }
    };

    const appWrapper = shallow(<SectionPage {...componentProps} />);

    it("sets the correct state", () => {
      expect(appWrapper.state("content")).toEqual(section);
    });

    it("renders the section title", () => {
      expect(appWrapper.find(Title).prop("children")).toEqual(section.title);
    });

    it("renders current progress step", () => {
      expect(appWrapper.find(Steps).prop("currentSection")).toEqual(index + 1);
      expect(appWrapper.find(Steps).prop("totalNumberOfSections")).toEqual(
        sections.length
      );
    });

    describe("renders the section form", () => {
      it("should render the Form component", () => {
        expect(appWrapper.find(Form)).toHaveLength(1);
      });

      it("renders a Submit button", () => {
        expect(appWrapper.find(Submit)).toHaveLength(1);
      });

      it("renders correct CTA text on the submit button", () => {
        if (index + 1 < sections.length) {
          expect(appWrapper.find(Submit).prop("text")).toEqual("Continue");
        } else {
          expect(appWrapper.find(Submit).prop("text")).toEqual(
            "Complete assessment"
          );
        }
      });

      describe("renders all the NON conditional form fields", () => {
        const nonConditionalFormFields = section.formFields.filter(
          ({ conditions }) => !conditions
        );

        nonConditionalFormFields.forEach(({ id, type }) => {
          it(`should render the ${id} field`, () => {
            expect(
              appWrapper.find(formFieldComponents[type]).find({ id })
            ).toHaveLength(1);
          });
        });
      });

      describe("correctly handles conditional fields", () => {
        beforeEach(() => {
          sessionStorage.clear();
        });

        const conditionalFormFields = section.formFields.filter(
          ({ conditions }) => conditions
        );

        conditionalFormFields.forEach(({ conditions, id, type }) => {
          it(`SHOULD render the ${id} field if conditions PASS`, () => {
            const originalAnswersState = { ...appWrapper.state("answers") };
            const passingAnswers = Object.assign(
              ...conditions.map(condition => passingConditionAnswer(condition))
            );
            const newAnswersState = {
              ...originalAnswersState,
              ...passingAnswers
            };

            appWrapper.setState({ answers: newAnswersState });

            expect(appWrapper.find(type).find({ id })).toHaveLength(1);
          });

          it(`SHOULD NOT render the ${id} field if conditions FAIL`, () => {
            const originalAnswersState = { ...appWrapper.state("answers") };
            const failingAnswers = Object.assign(
              ...conditions.map(condition => failingConditionAnswer(condition))
            );
            const newAnswersState = {
              ...originalAnswersState,
              ...failingAnswers
            };

            appWrapper.setState({ answers: newAnswersState });

            expect(appWrapper.find(type).find({ id })).toHaveLength(0);
          });
        });
      });
    });

    if (index + 1 < sections.length) {
      it("should set the state nextPage to the next section path", () => {
        expect(appWrapper.state("nextPage")).toEqual(
          `/section/${sections[index + 1].id}`
        );
      });
    } else {
      it("should set the state nextPage to the results path", () => {
        expect(appWrapper.state("nextPage")).toEqual("/results");
      });
    }

    if (index > 0) {
      it("renders the BackLink to the previous section", () => {
        expect(appWrapper.find(BackLink).prop("to")).toEqual(
          `/section/${sections[index - 1].id}`
        );
      });
    } else {
      it("renders the BackLink to the start page", () => {
        expect(appWrapper.find(BackLink).prop("to")).toEqual("/");
      });
    }
  });
});

describe("sessionStorage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should store answers to sessionStorage", () => {
    const testSection = sections[0];
    const componentProps = {
      match: {
        params: {
          sectionId: testSection.id
        }
      }
    };

    const appWrapper = shallow(<SectionPage {...componentProps} />);

    const stateUpdate = Object.assign(
      ...testSection.formFields.map(
        field =>
          field.type !== "DateControl"
            ? {
                [field.id]: { value: `Test value for ${field.id}` }
              }
            : {
                [`${field.id}-day`]: {
                  value: `Test value for ${field.id}-day`
                },
                [`${field.id}-month`]: {
                  value: `Test value for ${field.id}-month`
                },
                [`${field.id}-year`]: {
                  value: `Test value for ${field.id}-year`
                }
              }
      )
    );

    appWrapper.setState({ answers: stateUpdate });

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      "assessment",
      JSON.stringify(stateUpdate)
    );
  });

  it("should use answers from sessionStorage", () => {
    const testSection = sections[0];
    const componentProps = { match: { params: { sectionId: testSection.id } } };

    const sessionStorageUpdate = Object.assign(
      ...testSection.formFields.map(
        field =>
          field.type !== "DateControl"
            ? {
                [field.id]: { value: `Test value for ${field.id}` }
              }
            : {
                [`${field.id}-day`]: {
                  value: `Test value for ${field.id}-day`
                },
                [`${field.id}-month`]: {
                  value: `Test value for ${field.id}-month`
                },
                [`${field.id}-year`]: {
                  value: `Test value for ${field.id}-year`
                }
              }
      )
    );

    sessionStorage.setItem("assessment", JSON.stringify(sessionStorageUpdate));

    const appWrapper = shallow(<SectionPage {...componentProps} />);

    expect(sessionStorage.getItem).toHaveBeenCalledWith("assessment");
    expect(appWrapper.state("answers")).toEqual(sessionStorageUpdate);
  });
});
