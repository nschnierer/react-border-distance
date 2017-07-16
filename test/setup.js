/*
 * Setup virtual dom for testing with jsdom.
 * Based on: http://airbnb.io/enzyme/docs/guides/jsdom.html 
 */

const { JSDOM } = require("jsdom");

const jsdom = new JSDOM(`<!doctype html><html><body></body></html>`);
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === "undefined")
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js"
};

copyProps(window, global);

// Mock window clientWidth and clientHeight
Object.defineProperty(global.window, "innerWidth", {
  writable: false,
  value: 500
});

Object.defineProperty(global.window, "innerHeight", {
  writable: false,
  value: 500
});
