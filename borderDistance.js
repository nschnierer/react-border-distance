import React from "react";

/**
 * Higher-order component (HOC) to get the distance to window border or scrollable element.
 * @param {Component} BaseComponent React component
 * @param {object} [style=null] Style for wrapper element
 * @returns {Component}
 */
export default function borderDistance(BaseComponent, style = null) {
  class WrappedComponent extends React.Component {
    constructor() {
      super();

      this.wrapperNode = undefined;
      this.distance = undefined;

      this.updateDistance = this.updateDistance.bind(this);
    }

    /**
     * Update distance.
     */
    updateDistance() {
      const { wrapperNode } = this;
      if (wrapperNode) {
        // Get scrollable parent element.
        const parentNode = this.getScrollParent(wrapperNode);
        // Get distance to parent or window border.
        const distance = this.getDistanceToParent(wrapperNode, parentNode);

        if (
          !this.distance ||
          distance.top !== this.distance.top ||
          distance.right !== this.distance.right ||
          distance.bottom !== this.distance.bottom ||
          distance.left !== this.distance.left
        ) {
          this.distance = distance;
          this.forceUpdate();
        }
      }
    }

    /**
     * Get parent scroll node.
     * @param {HTMLElement} node
     * @returns {HTMLElement}
     */
    getScrollParent(node) {
      if (node === null) {
        return null;
      }
      if (node === document.body) {
        return node;
      }
      if (node.scrollHeight > node.clientHeight) {
        return node;
      }
      return this.getScrollParent(node.parentNode);
    }

    /**
     * Get distance of children to parent element.
     * @param {HTMLElement} childrenNode
     * @param {HTMLElement} parentNode
     * @returns {object} distance
     */
    getDistanceToParent(childrenNode, parentNode) {
      // Get rect of children and parent.
      const childrenPos = childrenNode.getBoundingClientRect();

      const parentPos =
        parentNode && parentNode !== document.body
          ? parentNode.getBoundingClientRect()
          : {
              top: 0,
              right: window.innerWidth,
              bottom: window.innerHeight,
              left: 0
            };

      const top = childrenPos.top - parentPos.top;
      const right = parentPos.right - childrenPos.right;
      const bottom = parentPos.bottom - childrenPos.bottom;
      const left = childrenPos.left - parentPos.left;

      return { top, right, bottom, left };
    }

    render() {
      const { distance } = this;

      return (
        <span
          ref={ref => (this.wrapperNode = ref)}
          onMouseEnter={this.updateDistance}
          style={{ display: "inline-block", ...style }}
        >
          <BaseComponent distance={distance} {...this.props} />
        </span>
      );
    }
  }

  return WrappedComponent;
}
