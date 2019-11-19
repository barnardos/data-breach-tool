import React from "react";
import { shallow } from "enzyme";
import Steps from "../../components/Steps";

describe("Steps", () => {
  const stepsProps = {
    currentSection: 1,
    totalNumberOfSections: 4
  };

  const expectedOutput = "Step 1 of 4";

  const stepsWrapper = shallow(<Steps {...stepsProps} />);

  it("Renders correct step in component", () => {
    expect(
      stepsWrapper
        .find(".Steps")
        .render()
        .text()
    ).toEqual(expectedOutput);
  });
});
