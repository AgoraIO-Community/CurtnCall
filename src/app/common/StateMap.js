import React, { Component } from "react";
import { Albers } from "@vx/geo";
import { ScaleSVG } from "@vx/responsive";
import Storage from "@aws-amplify/storage";
import { withTooltip, TooltipWithBounds } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class StateMap extends Component {
  state = { states: null };

  componentDidMount = async () => {
    const statesLink = await Storage.get("states.json");

    let states = await fetch(statesLink);
    states = await states.json();

    this.setState({ states });
  };

  handleMouseEnter = (event, datum) => {
    let count = this.props.stateData[`${datum.properties.ABBRV}`];

    if (!count) {
      count = 0;
    }

    const tooltipData = `${datum.properties.NAME}: ${count}`;

    const coords = localPoint(event.target.ownerSVGElement, event);
    this.props.showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData
    });
  };

  render() {
    const width = 500;
    const height = 250;

    const {
      stateData,
      scale,
      tooltipData,
      tooltipOpen,
      hideTooltip
    } = this.props;
    const { states } = this.state;

    if (!states) {
      return (
        <div
          style={{
            width: "100%",
            minHeight: "16rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div style={{ display: "block", textAlign: "center" }}>
            <div style={{ fontSize: "8rem", color: "#22292f" }}>
              <FontAwesomeIcon icon={["far", "ellipsis-h"]} pulse />
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <ScaleSVG width={width} height={height}>
          <Albers
            data={states.features}
            scale={500}
            translate={[width / 2, height / 2]}
            fill={feature => {
              const state = feature.properties.ABBRV;
              const count = stateData[`${state}`];
              return scale(count);
            }}
            stroke={() => "#fff"}
            onMouseEnter={data => event => {
              this.handleMouseEnter(event, data);
            }}
            onMouseLeave={data => event => {
              hideTooltip();
            }}
          />
        </ScaleSVG>
        {tooltipOpen && (
          <TooltipWithBounds
            // set this to random so it correctly updates with parent bounds
            key={Math.random()}
            className="geo-tooltip"
            style={{
              backgroundColor: "#3490dc",
              color: "white",
              left: 0,
              top: 0,
              marginTop: "1rem",
              marginRight: "1rem",
              padding: "0.5rem",
              fontSize: "1.05rem",
              fontWeight: 700
            }}
          >
            <div>{tooltipData}</div>
          </TooltipWithBounds>
        )}
      </React.Fragment>
    );
  }
}

export default withTooltip(StateMap);
