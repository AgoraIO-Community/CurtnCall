import React, { Component } from "react";
import { Albers } from "@vx/geo";
import states from "../data/states.json";
import { ScaleSVG } from "@vx/responsive";
import theme from "../theme";

export default class StateMap extends Component {
  render() {
    const { stateData, selectedStateCountType } = this.props;
    const width = 600;
    const height = 250;
    let activeObj = null;
    for (let i = 0; i < stateData.length; i++) {
      const { type } = stateData[i];
      if (type === selectedStateCountType) {
        activeObj = stateData[i].stateCount;
        break;
      }
    }

    return (
      <ScaleSVG width={width} height={height}>
        <Albers
          data={states.features}
          scale={550}
          translate={[width / 2, height / 2]}
          fill={feature => {
            const state = feature.properties.ABBRV;
            const count = activeObj[`${state}`];

            if (count) {
              return theme.color.darkGreen;
            } else {
              return theme.color.black;
            }
          }}
          stroke={() => "#fff"}
        />
      </ScaleSVG>
    );
  }
}
