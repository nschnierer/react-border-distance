import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import TestUtils from 'react-dom/test-utils';

import borderDistance from '../borderDistance';

describe('borderDistance', () => {
  function Component() {
    return <div>Test</div>;
  }

  beforeAll(() => {
    // mock element
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 100,
      top: 200,
      right: 300,
      bottom: 300,
      left: 200
    }));
  });

  it('should be defined', () => {
    expect(borderDistance).toBeDefined();
  });

  it('should pass other props to component', () => {
    const HocComponent = borderDistance()(Component);
    const wrapper = mount(<HocComponent random={true} />);
    const RenderedComponent = wrapper.find(Component);

    expect(RenderedComponent.prop('random')).toEqual(true);
  });

  it('should pass distance prop to component', () => {
    const HocComponent = borderDistance()(Component);
    const wrapper = mount(<HocComponent />);
    const RenderedComponent = wrapper.find(Component);

    TestUtils.Simulate.mouseEnter(wrapper.getDOMNode());

    expect(RenderedComponent.prop('distance')).toEqual({
      top: 200,
      right: 200,
      bottom: 200,
      left: 200
    });
  });

  it('should pass distance prop to component with parent scroll element', () => {
    // Create a scroll element.
    var scrollElem = document.createElement('div');
    scrollElem.setAttribute('id', 'scroll-element');

    // Mock things...
    Object.defineProperty(scrollElem, 'scrollHeight', {
      get: () => 1000,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(scrollElem, 'clientHeight', {
      get: () => 400,
      enumerable: true,
      configurable: true
    });
    scrollElem.getBoundingClientRect = () => ({
      width: 400,
      height: 400,
      top: 50,
      right: 450,
      bottom: 450,
      left: 50
    });

    global.document.body.appendChild(scrollElem);

    const HocComponent = borderDistance()(Component);
    const wrapper = mount(<HocComponent />, {
      attachTo: global.document.getElementById('scroll-element')
    });

    const RenderedComponent = wrapper.find(Component);

    TestUtils.Simulate.mouseEnter(wrapper.getDOMNode());

    expect(RenderedComponent.prop('distance')).toEqual({
      top: 150,
      right: 150,
      bottom: 150,
      left: 150
    });

    wrapper.detach();
  });

  it('should pass style or className to wrapper component', () => {
    const HocComponent = borderDistance({ position: 'relative' }, 'class-name')(
      Component
    );
    const wrapper = mount(<HocComponent />);

    const wrapperElem = wrapper.find('span').getDOMNode();

    expect(wrapperElem.style.display).toEqual('inline-block');
    expect(wrapperElem.style.position).toEqual('relative');
    expect(wrapperElem.className).toEqual('class-name');
  });
});
