import React from "react";
import { mount, shallow } from "enzyme";
import TestUtils from "react-dom/test-utils";

import borderDistance from "./borderDistance";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

global.window = dom.window;
global.document = dom.window.document;

describe("borderDistance", () => {
  function Component() {
    return <div />;
  }

  function ComponentScroll({ children }) {
    return (
      <div>
        {children}
        <div style={{ marginTop: "10000px" }} />
      </div>
    );
  }

  it("should be defined", () => {
    expect(borderDistance).toBeDefined();
  });

  it("should pass borderDistance prop to component", () => {
    const HocComponent = borderDistance(Component);
    const wrapper = mount(<HocComponent />);
    const RenderedComponent = wrapper.find(Component);

    TestUtils.Simulate.mouseEnter(wrapper.getDOMNode());

    expect(RenderedComponent.prop("borderDistance")).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
  });

  it("should pass other props to component", () => {
    const HocComponent = borderDistance(Component);
    const wrapper = mount(<HocComponent status={true} />);
    const RenderedComponent = wrapper.find(Component);

    expect(RenderedComponent.prop("status")).toEqual(true);
  });

  it("should ...", () => {
    // TODO:
  });
});
