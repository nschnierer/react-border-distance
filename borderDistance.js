import React from 'react';

/**
 * Higher-order component (HOC) to get the distance to window border or scrollable element.
 * @param {object} [style=null] Style for wrapper element
 * @param {string} [className] className for wrapper element
 * @returns {Component}
 */
export default function borderDistance(style = null, className) {
  return function(BaseComponent) {
    return class WrappedComponent extends React.Component {
      constructor() {
        super();

        this.wrapperNode = undefined;
        this.setWrapperNode = this.setWrapperNode.bind(this);
      }

      /**
       * Set wrapperNode.
       * @param {HTMLElement} ref 
       */
      setWrapperNode(ref) {
        this.wrapperNode = ref;
        this.forceUpdate();
      }

      /**
       * Get distance.
       * @returns {object}
       */
      getDistance() {
        const { wrapperNode } = this;
        if (wrapperNode) {
          // Get scrollable parent element.
          const parentNode = this.getScrollParent(wrapperNode.parentNode);
          // Get distance to parent or window border.
          const distance = this.getDistanceToParent(wrapperNode, parentNode);

          return distance;
        }
        return null;
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

        const overflowY = window.getComputedStyle(node).overflowY;
        const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

        if (isScrollable && node.scrollHeight > node.clientHeight) {
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
        const distance = this.getDistance();

        return (
          <span
            ref={this.setWrapperNode}
            style={{ display: 'inline-block', ...style }}
            className={className}
          >
            <BaseComponent distance={distance} {...this.props} />
          </span>
        );
      }
    };
  };
}
