## React Border Distance

![version](https://img.shields.io/npm/v/react-border-distance.svg)

A higher-order component (HOC) to get the distance of a react element to a scrollable element or window border.
Helpful for action-based overlapping content e.g. dropdown or tooltips.

<img src="https://raw.githubusercontent.com/nschnierer/react-border-distance/master/assets/dropdown-example.jpg" alt="react-border-distance" width="500" style="box-shadow: 0 0 2px #999" />

## Usage
The package can be installed via NPM:
```
npm install --save react-border-distance
```

Example with decorator (e.g. babel-plugin-transform-decorators-legacy):

> `distance` prop is only available when the mouse enters the component (onMouseEnter).
```js
import React from "react";
import borderDistance from "react-border-distance";

@borderDistance()
class DropDown extends React.Component {
  /*...*/
  render() {
    const { distance } = this.props;

    const type = distance && distance.bottom < 100
      ? "dropup"
      : "dropdown";

    return(
      <div className={`${type}`}>
      </div>
    );
  }
}
```

Example without decorator (e.g. babel-plugin-transform-decorators-legacy):
```js
import React from "react";
import borderDistance from "react-border-distance";

class DropDown extends React.Component {
  /*... see above ...*/
}

export default borderDistance()(DropDown);
```

Style wrapper component:
```js
@borderDistance({ position: "relative" }, "class-name")
class ...

// or

export default borderDistance({ position: "relative" }, "class-name")(DropDown);
```

## Available Props

#### `distance: object;`
An Object which contains the distance.
`{ top: number, right: number, bottom: number, left: number }`
(Only available onMouseEnter)
