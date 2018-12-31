import React, { Component } from "react";
import { scaleLinear, scaleOrdinal } from "@vx/scale";
import { Group } from "@vx/group";
import { extent, max } from "d3-array";
import { AxisLeft, AxisBottom, AxisRight } from "@vx/axis";
import { LinePath, AreaClosed } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { LegendOrdinal } from "@vx/legend";
import { ScaleSVG } from "@vx/responsive";
import { getReactionColor, capitalize } from "../utility";
import { GlyphDot } from "@vx/glyph";
import { withTooltip, TooltipWithBounds } from "@vx/tooltip";
import { localPoint } from "@vx/event";

// responsive utils for axis ticks
function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

class ReactionChart extends Component {
  state = {
    reactionTimeArrays: [],
    viewerTimeArray: [],
    performanceInterval: null
  };

  componentDidMount = () => {
    const { reactionTimeArrays, viewerTimeArray } = this.props;

    const domain = [];
    const range = [];

    reactionTimeArrays.forEach(reactionTimeArray => {
      const { reaction } = reactionTimeArray[0];

      domain.push(reaction);
      range.push(getReactionColor(reaction));
    });

    if (viewerTimeArray) {
      if (viewerTimeArray.length > 0) {
        domain.push("viewers");
        range.push("rgba(167, 121, 233, 0.25)");
      }
    }

    const ordinalColor = scaleOrdinal({
      domain,
      range
    });

    this.setState({
      ordinalColor,
      reactionTimeArrays,
      viewerTimeArray
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.performancePaused && !prevProps.performancePaused) {
      clearInterval(this.state.performanceInterval);
      this.setState({ performanceInterval: null });
    }

    if (this.props.performancePlaying && !prevProps.performancePlaying) {
      if (this.state.performanceInterval) {
        clearInterval(this.state.performanceInterval);
        this.setState({ performanceInterval: null }, () => {
          this._startInterval();
        });
      }
      this._startInterval();
    }
  };

  _startInterval = () => {
    const {
      reactionTimeArrays,
      performanceElapsed,
      viewerTimeArray
    } = this.props;

    if (viewerTimeArray) {
      if (viewerTimeArray.length > 0) {
        let i = performanceElapsed + 1;

        const performanceInterval = setInterval(() => {
          if (i === viewerTimeArray.length + 1) {
            clearInterval(performanceInterval);
            return;
          }

          const viewerReturnArray = viewerTimeArray.slice(0, i);

          let reactionReturnArray = [];

          if (reactionTimeArrays) {
            if (reactionTimeArrays.length > 0) {
              reactionTimeArrays.forEach(reactionTimeArray => {
                const newReactionArray = reactionTimeArray.slice(0, i);

                reactionReturnArray.push(newReactionArray);
              });
            }
          }

          i++;

          this.setState({
            viewerTimeArray: viewerReturnArray,
            reactionTimeArrays: reactionReturnArray
          });
        }, 1000);

        this.setState({ performanceInterval });
      }
    }
  };

  handleMouseOver = (event, datum) => {
    const { second } = datum;

    const returnArray = [];
    returnArray.push({
      reaction: "Seconds",
      count: second
    });

    const { reactionTimeArrays } = this.props;

    reactionTimeArrays.forEach(reactionTimeArray => {
      const { reaction } = reactionTimeArray[0];

      returnArray.push({
        reaction,
        count: reactionTimeArray[second - 1].count
      });
    });

    const coords = localPoint(event.target.ownerSVGElement, event);
    this.props.showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: returnArray
    });
  };

  render() {
    const {
      width,
      height,
      margin,
      tooltipData,
      tooltipOpen,
      hideTooltip
    } = this.props;

    const { reactionTimeArrays, viewerTimeArray, ordinalColor } = this.state;

    if (!ordinalColor) {
      return null;
    }

    const x = d => d.second;
    const y = d => d.count;
    const z = d => d.count;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    const zMax = height - margin.top - margin.bottom;

    // scales
    let xScale;
    let yMaximum;
    let zMaximum = max(viewerTimeArray).count;

    if (zMaximum < 5) {
      zMaximum = 5;
    }

    if (this.props.reactionTimeArrays.length > 0) {
      xScale = scaleLinear({
        range: [0, xMax],
        domain: extent(this.props.reactionTimeArrays[0], x)
      });

      yMaximum = max(
        this.props.reactionTimeArrays.map(d => {
          let holdingMax = max(d, y);
          if (holdingMax < 5) {
            holdingMax = 5;
          }

          return holdingMax;
        })
      );
    } else {
      xScale = scaleLinear({
        range: [0, xMax],
        domain: [1, this.props.viewerTimeArray.length]
      });
      yMaximum = zMaximum;
    }

    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, yMaximum],
      nice: true //Extends the domain so that it starts and ends on nice round values.
    });

    const zScale = scaleLinear({
      range: [zMax, 0],
      domain: [0, zMaximum],
      nice: true //Extends the domain so that it starts and ends on nice round values.
    });

    return (
      <div style={{ background: "white" }}>
        <ScaleSVG width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={`#fff`}
            //   rx={14}
          />

          <LegendOrdinal
            scale={ordinalColor}
            direction="column"
            shapeMargin="0"
            labelMargin="0 0 0 4px"
            itemMargin="0.25rem"
            shape="rect"
            fill={({ datum }) => {
              return ordinalColor(datum);
            }}
            labelFormat={label => {
              return capitalize(label);
            }}
          />

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a779e9" stopOpacity={1} />
              <stop offset="100%" stopColor="#a779e9" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <Group top={margin.top} left={margin.left}>
            <LinePath
              data={viewerTimeArray}
              xScale={xScale}
              yScale={zScale}
              x={x}
              y={y}
              stroke="rgba(167, 121, 233, 0.25)"
              strokeWidth={1}
              curve={curveMonotoneX}
            />
            <AreaClosed
              data={viewerTimeArray}
              xScale={xScale}
              yScale={zScale}
              x={x}
              y={z}
              strokeWidth={1}
              stroke={"rgba(167, 121, 233, 0.25)"}
              fill={"rgba(167, 121, 233, 0.25)"}
              curve={curveMonotoneX}
            />

            {reactionTimeArrays.length > 0 &&
              reactionTimeArrays.map((reactionTimeArray, i) => {
                const { reaction } = reactionTimeArray[0];

                return (
                  <LinePath
                    key={reaction}
                    data={reactionTimeArray}
                    xScale={xScale}
                    yScale={yScale}
                    x={x}
                    y={y}
                    stroke={ordinalColor(reaction)}
                    // stroke={"url('#linear')"}
                    strokeWidth={2}
                    curve={curveMonotoneX}
                    glyph={(d, i) => {
                      if (!d.count) return null;

                      return (
                        <GlyphDot
                          className="glyph-dots"
                          key={`line-dot-${reaction}-${d.second}`}
                          cx={xScale(x(d))}
                          cy={yScale(y(d))}
                          r={4}
                          fill={ordinalColor(reaction)}
                          stroke={ordinalColor(reaction)}
                          strokeWidth={1.5}
                          onMouseOver={e => this.handleMouseOver(e, d)}
                          onMouseOut={hideTooltip}
                        />
                      );
                    }}
                  />
                );
              })}
          </Group>

          <Group left={margin.left}>
            <AxisLeft
              top={margin.top}
              left={0}
              scale={yScale}
              hideZero
              numTicks={numTicksForHeight(height)}
              label="Reaction Count"
              labelProps={{
                fill: "#000",
                textAnchor: "middle",
                fontSize: 12,
                fontFamily: "Arial",
                fontWeight: "600"
              }}
              stroke="#000"
              tickFormat={(val, i) => {
                return val;
              }}
              tickStroke="#000"
              tickLabelProps={(value, index) => ({
                fill: "#000",
                textAnchor: "end",
                fontSize: 10,
                fontFamily: "Arial",
                dx: "-0.25em",
                dy: "0.25em"
              })}
              tickComponent={({ formattedValue, ...tickProps }) => (
                <text {...tickProps}>{formattedValue}</text>
              )}
              tickLength={6}
            />
            <AxisRight
              top={margin.top}
              left={xMax}
              scale={zScale}
              hideZero
              numTicks={numTicksForHeight(height)}
              label="Viewer Count"
              labelProps={{
                fill: "#000",
                textAnchor: "middle",
                fontSize: 12,
                fontFamily: "Arial",
                fontWeight: "600"
              }}
              stroke="#000"
              tickFormat={(val, i) => {
                return val;
              }}
              tickStroke="#000"
              tickLabelProps={(value, index) => ({
                fill: "#000",
                textAnchor: "start",
                fontSize: 10,
                fontFamily: "Arial",
                dx: "0.25em",
                dy: "0.25em"
              })}
              tickComponent={({ formattedValue, ...tickProps }) => (
                <text {...tickProps}>{formattedValue}</text>
              )}
              tickLength={6}
            />
            <AxisBottom
              top={height - margin.bottom}
              left={0}
              scale={xScale}
              numTicks={numTicksForWidth(width)}
              label="Seconds"
              labelProps={{
                fill: "#000",
                textAnchor: "middle",
                fontSize: 12,
                fontFamily: "Arial",
                fontWeight: 600
              }}
              stroke="#000"
              tickFormat={(val, i) => {
                return val;
              }}
              tickStroke="#000"
              tickLabelProps={(value, index) => ({
                fill: "#000",
                textAnchor: "end",
                fontSize: 10,
                fontFamily: "Arial",
                dx: "-0.25em",
                dy: "0.25em"
              })}
            />
          </Group>
        </ScaleSVG>
        {tooltipOpen && (
          <TooltipWithBounds
            // set this to random so it correctly updates with parent bounds
            key={Math.random()}
            top={0}
            left={0}
          >
            <table>
              <tbody>
                {tooltipData.map((tooltipItem, i) => {
                  return (
                    <tr key={tooltipItem.reaction}>
                      <td
                        style={{
                          color: getReactionColor(tooltipItem.reaction),
                          padding: "0.25rem"
                        }}
                      >
                        {capitalize(tooltipItem.reaction)}
                      </td>

                      <td style={{ padding: "0.25rem", color: "black" }}>
                        {tooltipItem.count}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TooltipWithBounds>
        )}
        <div
          style={{
            fontSize: "0.70rem",
            paddingLeft: "0.75rem",
            paddingBottom: "0.5rem"
          }}
        >
          <LegendOrdinal
            scale={ordinalColor}
            direction="row"
            shapeMargin="0"
            labelMargin="0 0 0 2px"
            itemMargin="0.15rem"
            shape="rect"
            fill={({ datum }) => {
              return ordinalColor(datum);
            }}
            labelFormat={label => {
              return capitalize(label);
            }}
          />
        </div>
      </div>
    );
  }
}

export default withTooltip(ReactionChart);
