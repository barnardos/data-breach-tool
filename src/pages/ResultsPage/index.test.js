import React from "react";
import { shallow } from "enzyme";

import ResultPage from "./index";
import {
  failingConditionAnswer,
  passingConditionAnswer,
  createMockAnswers
} from "../../utils/testHelpers";
import { resultsPage } from "../../data/resultsPage.json";
import { sections as sectionsData } from "../../data/sections.json";

import HeadingOne from "../../components/HeadingOne";
import Output from "../../components/Output";
import Paragraph from "../../components/Paragraph";
import Title from "../../components/Title";
import BackLink from "../../components/BackLink";
import Table from "../../components/Table";

describe("<ResultsPage /> content", () => {
  const appWrapper = shallow(<ResultPage />);

  it("renders the back button", () => {
    expect(appWrapper.find(BackLink).prop("to")).toEqual(
      `/section/${sectionsData[sectionsData.length - 1].id}`
    );
  });

  it("renders the application resultPage title", () => {
    expect(appWrapper.find(Title).prop("children")).toEqual(resultsPage.title);
  });

  it("renders the application resultPage paragraph", () => {
    expect(
      appWrapper
        .find(Paragraph)
        .first()
        .prop("children")
    ).toEqual(resultsPage.paragraph);
  });

  it("calls sessionStorage to get the assessment answers", () => {
    expect(sessionStorage.getItem).toHaveBeenCalledWith("assessment");
  });
});

describe("<ResultsPage /> sections", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });
  resultsPage.sections.map(({ heading, outputs }) => {
    outputs.map(({ id, output, conditions, outputType }) => {
      switch (outputType) {
        case "text":
          it(`renders output ${id} on the results page if conditions are met`, () => {
            const answers = Object.assign(
              ...conditions.map(condition => passingConditionAnswer(condition))
            );

            const sessionStorageDataMock = JSON.stringify(answers);
            sessionStorage.setItem("assessment", sessionStorageDataMock);

            const appWrapper = shallow(<ResultPage />);

            expect(sessionStorage.getItem).toHaveBeenCalledWith("assessment");
            expect(sessionStorage.getItem("assessment")).toEqual(
              sessionStorageDataMock
            );

            expect(appWrapper.find(Output).find({ output })).toHaveLength(1);
            expect(
              appWrapper.find(HeadingOne).find({
                children: heading
              })
            ).toHaveLength(1);
          });

          it(`DOES NOT render output ${id} on the results page if conditions are met`, () => {
            const answers = Object.assign(
              ...conditions.map(condition => failingConditionAnswer(condition))
            );
            const sessionStorageDataMock = JSON.stringify(answers);
            sessionStorage.setItem("assessment", sessionStorageDataMock);

            const appWrapper = shallow(<ResultPage />);

            expect(sessionStorage.getItem).toHaveBeenCalledWith("assessment");
            expect(sessionStorage.getItem("assessment")).toEqual(
              sessionStorageDataMock
            );
            expect(appWrapper.find(Output).find({ output })).toHaveLength(0);
          });

          if (conditions.some(condition => condition.required)) {
            it(`output ${id} SHOULD show if only required conditions are true`, () => {
              const answers = Object.assign(
                ...conditions.map(
                  condition =>
                    condition.required
                      ? passingConditionAnswer(condition)
                      : failingConditionAnswer(condition)
                )
              );
              sessionStorage.setItem("assessment", JSON.stringify(answers));

              const appWrapper = shallow(<ResultPage />);

              expect(appWrapper.find(Output).find({ output })).toHaveLength(1);
            });

            it(`output ${id} SHOULD NOT show if required conditions are false and all other conditions are true`, () => {
              const answers = Object.assign(
                ...conditions.map(
                  condition =>
                    condition.required
                      ? failingConditionAnswer(condition)
                      : passingConditionAnswer(condition)
                )
              );
              sessionStorage.setItem("assessment", JSON.stringify(answers));

              const appWrapper = shallow(<ResultPage />);
              expect(appWrapper.find(Output).find({ output })).toHaveLength(0);
            });
          }
          break;
        case "tableFromTagTotals":
          it(`<Table /> counts correct amount of answers for the table`, () => {
            const answers = createMockAnswers(resultsPage);
            const answersAmount = Object.keys(answers).length;

            const sessionStorageDataMock = JSON.stringify(answers);
            sessionStorage.setItem("assessment", sessionStorageDataMock);
            const appWrapper = shallow(<ResultPage />);

            let sections = appWrapper.state().sections;
            sections = sections.filter(section => section.type === "table")[0]
              .outputs[0].tableFromTagTotals.total;

            let totalsSum = Object.values(sections).reduce((a, b) => a + b);

            expect(sessionStorage.getItem).toHaveBeenCalledWith("assessment");
            expect(sessionStorage.getItem("assessment")).toEqual(
              sessionStorageDataMock
            );
            expect(totalsSum).toEqual(answersAmount);
          });

          it(`<Table /> renders correct amount in table totals`, () => {
            const sessionStorageDataMock = JSON.stringify(
              createMockAnswers(resultsPage)
            );
            sessionStorage.setItem("assessment", sessionStorageDataMock);
            const appWrapper = shallow(<ResultPage />);

            let sections = appWrapper.state().sections;
            let totals = sections.filter(section => section.type === "table")[0]
              .outputs[0].tableFromTagTotals.total;

            Object.entries(totals).forEach(entry => {
              let type = entry[0];
              let className = `.total-${type}`;

              expect(
                parseInt(
                  appWrapper
                    .find(Table)
                    .dive()
                    .find(className)
                    .text()
                )
              ).toBe(totals[type]);
            });
            expect(sessionStorage.getItem).toHaveBeenCalledWith("assessment");
            expect(sessionStorage.getItem("assessment")).toEqual(
              sessionStorageDataMock
            );
          });
          break;

        default:
          break;
      }
    });
  });
});
