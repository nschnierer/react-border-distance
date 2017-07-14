import React from "react";
import { mount } from "enzyme";
import TestUtils from "react-dom/test-utils";

import borderDistance from "./borderDistance";

describe("borderDistance()", () => {
  beforeAll(() => {
    // mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 25,
      height: 25,
      top: 25,
      right: 50,
      bottom: 50,
      left: 25
    }));
    // mock window
    global.window.innerWidth = 100;
    global.window.innerHeight = 100;
  });

  function Component() {
    return <div />;
  }

  it("should be defined", () => {
    expect(borderDistance).toBeDefined();
  });

  it("should pass borderDistance prop to component", () => {
    const HocComponent = borderDistance(Component);
    const wrapper = mount(<HocComponent />);
    const RenderedComponent = wrapper.find(Component);

    TestUtils.Simulate.mouseEnter(wrapper.getDOMNode());

    expect(RenderedComponent.prop("distance")).toEqual({
      top: 25,
      right: 50,
      bottom: 50,
      left: 25
    });
  });

  it("should pass other props to component", () => {
    const HocComponent = borderDistance(Component);
    const wrapper = mount(<HocComponent status={true} />);
    const RenderedComponent = wrapper.find(Component);

    expect(RenderedComponent.prop("status")).toEqual(true);
  });
});
