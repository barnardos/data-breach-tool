import React from "react";
import { shallow } from "enzyme";

import StartPage from "./index";
import { startPage } from "../../data/startPage.json";
import { sections } from "../../data/sections.json";

import Paragraph from "../../components/Paragraph";
import StartLink from "../../components/StartLink";
import Title from "../../components/Title";

jest.mock("react-router-dom");

const appWrapper = shallow(<StartPage />);

test("renders the application startPage title", () => {
  expect(appWrapper.find(Title).prop("children")).toEqual(startPage.title);
});

test("renders the application startPage paragraphOne", () => {
  expect(
    appWrapper
      .find(Paragraph)
      .at(0)
      .prop("children")
  ).toEqual(startPage.paragraphOne);
});

test("renders the application startPage unorderedListItem title", () => {
  expect(
    appWrapper
      .find(Paragraph)
      .at(1)
      .prop("children")
  ).toEqual(startPage.unorderedListItem.title);
});

test("renders the application startPage paragraphTwo", () => {
  expect(
    appWrapper
      .find(Paragraph)
      .at(2)
      .prop("children")
  ).toEqual(startPage.paragraphTwo);
});

test("renders the application startPage paragraphThree in bold", () => {
  expect(
    appWrapper
      .find(Paragraph)
      .at(3)
      .prop("children")
  ).toEqual(startPage.paragraphThree);
});

test("renders the application startPage paragraphFour", () => {
  expect(
    appWrapper
      .find(Paragraph)
      .at(4)
      .prop("children")
  ).toEqual(startPage.paragraphFour);
});

test("renders the application startPage paragraph", () => {
  expect(appWrapper.find(StartLink).prop("to")).toEqual(
    `/section/${sections[0].id}`
  );
});
