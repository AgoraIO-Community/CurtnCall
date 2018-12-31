import React, { Component } from "react";
import styled from "styled-components";
import { isEqual } from "../utility";

const StyledCurrentPerformerViewerLocations = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 2rem;
  min-height: 267.55px;
`;

const StateMapTitle = styled.div`
  margin-bottom: 1rem;
`;

export default class CurrentPerformerViewerLocations extends Component {
  // StateMap = null;

  // componentDidMount = () => {
  //   if (this.props.isMobile) {
  //     import("./StateMap").then(StateMap => {
  //       this.StateMap = StateMap;
  //     });
  //   }
  // };

  shouldComponentUpdate = nextProps => {
    if (!this.props.viewerStateCount) {
      return true;
    }

    const objectsAreEqual = isEqual(
      this.props.viewerStateCount,
      nextProps.viewerStateCount
    );

    if (!objectsAreEqual) {
      return true;
    }

    return false;
  };

  render() {
    const { viewerStateCount } = this.props;

    let statesWithViewers = [];
    let countsArray = [];
    if (viewerStateCount) {
      for (const key in viewerStateCount) {
        if (viewerStateCount.hasOwnProperty(key)) {
          const stateCount = viewerStateCount[key];
          if (stateCount > 0) {
            statesWithViewers.push(key);
            const returnObj = { stateName: key, stateCount };
            countsArray.push(returnObj);
          }
        }
      }
    }

    let sortedArray = countsArray.sort((a, b) => {
      return b.stateCount - a.stateCount;
    });

    sortedArray = sortedArray.slice(0, 5);

    return (
      <StyledCurrentPerformerViewerLocations>
        {/* {!isMobile && <StateMap statesWithViewers={statesWithViewers} />} */}
        <div>
          <StateMapTitle>Top 5 States</StateMapTitle>
          <table>
            <tbody>
              {sortedArray.map((stateObj, i) => {
                return (
                  <tr key={stateObj.stateName}>
                    <td>{stateObj.stateName}</td>
                    <td>{stateObj.stateCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </StyledCurrentPerformerViewerLocations>
    );
  }
}
