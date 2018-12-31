import React, { Component, Fragment } from "react";
import moment from "moment";
import styled from "styled-components";
import humanizeDuration from "humanize-duration";
import CountdownTimeContainer from "./CountdownTimeContainer";

const ShowTitle = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ShowDescriptor = styled.div`
  margin-bottom: 0.5rem;
`;

const ShowInfoList = styled.ul`
  padding-inline-start: 1rem;
  margin-block-start: 0.25rem;
  margin-block-end: 0.25rem;

  ${props => props.removeBulletPoints && "list-style-type: none;"}
`;

const ShowInfoListItem = styled.li`
  margin-bottom: 0.25rem;
  line-height: 1.45rem;
`;

const ShowInfoWrapper = styled.div`
  ${props => props.padding && "padding: 0.5rem;"}
`;

export default class ShowInfo extends Component {
  render() {
    const { padding, removeBulletPoints, setShow, show } = this.props;

    return (
      <ShowInfoWrapper padding={padding}>
        <ShowTitle>{show.showName}</ShowTitle>
        <ShowDescriptor>{show.showDescription}</ShowDescriptor>
        <hr />
        <ShowInfoList removeBulletPoints={removeBulletPoints}>
          <ShowInfoListItem>
            Show Ends at {moment(show.showEnd).format("h:mm a")}
          </ShowInfoListItem>
          <ShowInfoListItem>
            Performance Duration: {humanizeDuration(show.performanceDuration)}
          </ShowInfoListItem>
          <ShowInfoListItem>
            Max # of Performances: {show.maxNumberOfPerformance}
          </ShowInfoListItem>
          <ShowInfoListItem>
            {Date.now() > show.showStart ? (
              <Fragment>
                Show Time Remaining{" "}
                <CountdownTimeContainer
                  endTimestamp={show.showEnd}
                  onComplete={() => {
                    console.log("Show ended");
                  }}
                />
              </Fragment>
            ) : (
              <Fragment>
                Time Until Show Starts{" "}
                <CountdownTimeContainer
                  endTimestamp={show.showStart}
                  onComplete={() => {
                    if (setShow) {
                      const showCopy = Object.create(show);
                      setShow(showCopy);
                    }
                  }}
                />
              </Fragment>
            )}
          </ShowInfoListItem>
        </ShowInfoList>
      </ShowInfoWrapper>
    );
  }
}
