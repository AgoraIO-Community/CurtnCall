import React, { Component } from "react";
import Dropdown from "./Dropdown";
import {
  Segment,
  SegmentHeader,
  SegmentHeaderText
} from "./styled-components/general";
import StateMap from "./StateMap";
import { LegendLinear } from "@vx/legend";
import { scaleLinear } from "@vx/scale";
import { entries } from "d3-collection";
import { max, min } from "d3-array";

class StateMapWrapper extends Component {
  state = { selectedStateCountType: this.props.stateCounts[0].type };

  onSelectStateChange = e => {
    const selectedStateCountType = e.target.value;

    this.setState({ selectedStateCountType });
  };

  render() {
    const { onSelectStateChange } = this;
    const { stateCounts } = this.props;
    const { selectedStateCountType } = this.state;

    let stateData;

    for (let i = 0; i < stateCounts.length; i++) {
      const { type, stateCount } = stateCounts[i];
      if (type === selectedStateCountType) {
        stateData = stateCount;
        break;
      }
    }

    const minValue = min(entries(stateData), function(d) {
      if (!d.value) return 0;
      return d.value;
    });

    const maxValue = max(entries(stateData), function(d) {
      return d.value;
    });

    const scale = scaleLinear({
      domain: [minValue, maxValue],
      range: ["#22292f", "#dae1e7"],
      nice: true
    });

    return (
      <Segment style={{ minHeight: "5rem" }}>
        <Segment style={{ marginBottom: "1rem" }}>
          <SegmentHeader>
            <SegmentHeaderText>
              State Map
              <div
                style={{
                  float: "right",
                  border: "2px solid #ffed4a",
                  marginTop: "-0.25rem"
                }}
              >
                <Dropdown
                  options={stateCounts}
                  onChangeCallback={onSelectStateChange}
                  style={{ border: 0 }}
                />
              </div>
            </SegmentHeaderText>
          </SegmentHeader>
          <div style={{ padding: "0.5rem" }}>
            <StateMap
              scale={scale}
              stateData={stateData}
              selectedStateCountType={selectedStateCountType}
            />
          </div>
          <div style={{ paddingLeft: "1rem", paddingBottom: "1rem" }}>
            <h5>Legend</h5>
            <LegendLinear direction="row" shape="circle" scale={scale} />
          </div>
        </Segment>
      </Segment>
    );
  }
}

export default StateMapWrapper;
