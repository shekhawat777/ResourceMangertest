import React from "react";
import Dashboard from "../views/Dashboard";
import { render } from "@testing-library/react";

let testName = "Dashboard boundary"

describe("boundary", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(<Dashboard />);
  });
  it(`${testName} should render dashboard page`, () => {
    expect(wrapper).toBeTruthy();
  });
});
