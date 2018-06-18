import React, { Component } from 'react';
import { Spring, config } from 'react-spring';
// import memoizeOne from 'memoize-one';

class DonutSvg extends Component {
  constructor(props) {
    super(props);
    this.style = {
      opacity: 0.3,
      transform: 'rotate(-90deg)',
      height: '100%',
      width: '100%',
    };
    console.log('DonutSvg const');
  }

  render() {
    console.log(this.props);
    const { props } = this;
    const { data, strokeWidth, colors } = props;
    // console.log(data);
    const l = data.length;

    let m = 0;
    const cums = [];
    for (let i = 0; i < l; i++) {
      cums.push((m += props[i]));
    }

    if (data && this.data !== data) {
      console.log(this.props);
    }
    this.data = data;
    console.log(cums);

    function getArr(length, callback) {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(callback(i));
      }
      return arr;
    }
    function getX(ratio) {
      return Math.cos(2 * Math.PI * ratio);
    }
    function getY(ratio) {
      return Math.sin(2 * Math.PI * ratio);
    }

    return (
      <svg viewBox="-1.5 -1.5 3 3" style={this.style}>
        {getArr(l, (i) => {
          const ratioS = i === 0 ? 0 : cums[i - 1];
          const ratioL = i === l ? 1 : cums[i];
          // console.log(ratioS, ratioL);
          return (
            <path
              key={i.toString()}
              fill="transparent"
              stroke={colors[i]}
              strokeWidth={strokeWidth}
              d={`M ${getX(ratioS)} ${getY(ratioS)} A 1 1 0 ${
                ratioL - ratioS > 0.5 ? 1 : 0
              } 1 ${getX(ratioL)} ${getY(ratioL)}`}
            />
          );
        })}
        Sorry, your browser does not support inline SVG.
      </svg>
    );
    // return null;
  }
}

// data: [10, 20, 30, 40]
export default class Donut extends Component {
  constructor(props) {
    super(props);

    console.log('Donut const');
  }

  render() {
    const { data, colors, strokeWidth } = this.props;
    console.log(data);

    const l = data.length;
    if (!l) {
      return null;
    }

    const init = [];
    for (let i = 0; i < l; i++) {
      init.push(0);
    }

    const sum = data.reduce((a, b) => a + b);
    const scaledData = [];
    for (let i = 0; i < l; i++) {
      const datum = data[i];
      scaledData.push(datum ? data[i] / sum : 0);
    }
    console.log('scaledData', scaledData);
    return (
      <Spring
        from={{ ...init }}
        to={{ ...scaledData }}
        // config={{ tension: 20, friction: 60 }}
        config={config}
        children={props => (
          <DonutSvg
            {...props}
            strokeWidth={strokeWidth}
            data={data}
            colors={colors}
          />
        )}
      />
    );
  }
}
