import React from "react";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";

import Routes from "./Routes";
import ResultsPage from "./pages/ResultsPage";
import SectionPage from "./pages/SectionPage";
import StartPage from "./pages/StartPage";

import { sections } from "./data/sections.json";

jest.mock("react-router-ga", () => "stub");

test("renders the StartPage on initial route", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/"]}>
      <Routes />
    </MemoryRouter>
  );

  expect(wrapper.find(StartPage)).toHaveLength(1);
});

test("renders a SectionPage on '/section/:sectionId'", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[`/section/${sections[0].id}`]}>
      <Routes />
    </MemoryRouter>
  );

  expect(wrapper.find(SectionPage)).toHaveLength(1);
});

test("renders 'Not found!' on '/section/undefined-route'", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/section/undefined-route"]}>
      <Routes />
    </MemoryRouter>
  );

  expect(wrapper.find(StartPage)).toHaveLength(1);
});

test("renders the ResultsPage on '/results' route", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/results"]}>
      <Routes />
    </MemoryRouter>
  );

  expect(wrapper.find(ResultsPage)).toHaveLength(1);
});

test("renders 'Not found!' on undefined route", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/undefined_route"]}>
      <Routes />
    </MemoryRouter>
  );

  expect(wrapper.find(StartPage)).toHaveLength(1);
});
