import React, { Fragment } from "react";
import { LegendOrdinal } from "@vx/legend";
import { capitalize } from "../utility";
import { Group } from "@vx/group";
import { LinePath, AreaClosed } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { AxisLeft, AxisBottom, AxisRight } from "@vx/axis";

export default function ChartElements({
  x,
  y,
  z,
  xMax,
  viewerTimeArray,
  zScale,
  numTicksForHeight,
  numTicksForWidth,
  width,
  height,
  ordinalColor,
  xScale,
  yScale,
  margin,
  reactionTimeArrays
}) {
  return (
    <svg>
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
        {reactionTimeArrays.length > 0 &&
          reactionTimeArrays.map((reactionTimeArray, i) => {
            const { reaction } = reactionTimeArray[0];

            return (
              <LinePath
                data={reactionTimeArray}
                xScale={xScale}
                yScale={yScale}
                x={x}
                y={y}
                stroke={ordinalColor(reaction)}
                // stroke={"url('#linear')"}
                strokeWidth={2}
                curve={curveMonotoneX}
              />
            );
          })}
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
    </svg>
  );
}
