import React from "react";
import { mount } from "enzyme";

import ActionConfirmation from "../../components/ActionConfirmation";
import Button from "../../components/Button";

describe("<ActionConfirmation /> content", () => {
  const componentProps = {
    actionText: "actionText",
    handleAction: jest.fn()
  };

  const actionConfirmationWrapper = mount(
    <ActionConfirmation {...componentProps} />
  );

  afterAll(() => {
    actionConfirmationWrapper.unmount();
  });

  it("renders the component", () => {
    expect(actionConfirmationWrapper).toHaveLength(1);
  });

  it("renders the action button", () => {
    expect(actionConfirmationWrapper.find(Button).text()).toEqual(
      componentProps.actionText
    );
  });

  describe("<ActionConfirmation /> actions", () => {
    it("should open confirmation with YES / NO buttons on click", () => {
      actionConfirmationWrapper
        .find(Button)
        .simulate("click", { preventDefault() {} });
      expect(actionConfirmationWrapper.find(Button)).toHaveLength(2);
    });

    it("should close the confirmation and render action button if user clicks NO", () => {
      actionConfirmationWrapper
        .find(Button)
        .at(1)
        .simulate("click", { preventDefault() {} });
      expect(actionConfirmationWrapper.find(Button)).toHaveLength(1);
    });
  });
});
