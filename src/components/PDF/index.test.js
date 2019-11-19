import React from "react";
import { shallow } from "enzyme";

import Pdf from "./index";

import DownloadButton from "../../components/DownloadButton";

describe("<Pdf /> content", () => {
  const data = {
    sections: [],
    answers: {},
    resultsPage: {},
    questionsAndAnswers: {},
    questionsAnswersAndDescriptions: []
  };

  const appWrapper = shallow(<Pdf {...data} />);

  it("renders the download button", () => {
    expect(appWrapper.find(DownloadButton)).toHaveLength(1);
  });
});
