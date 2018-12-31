import React, { Component, Fragment } from "react";
import ReactPlayer from "react-player";
import Curtain from "../common/Curtain";
import styled from "styled-components";
import { sendPerformanceReady } from "./graphql";
import { withApollo } from "react-apollo";

const StyledCurtainWrapper = styled.div`
  display: ${props => (props.loading ? "flex" : "none")};
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

class RemoteVideo extends Component {
  render() {
    const { performanceReady, viewerStream } = this.props;

    let reactPlayerStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "#22292f"
    };

    if (!performanceReady) {
      reactPlayerStyle.display = "none";
    } else {
      reactPlayerStyle.display = "inline-block";
    }

    return (
      <Fragment>
        <StyledCurtainWrapper loading={!performanceReady}>
          <Curtain loading />
        </StyledCurtainWrapper>

        <ReactPlayer
          url={viewerStream}
          playing
          width="100%"
          height="100%"
          onPlay={async () => {
            try {
              const {
                channelName,
                client,
                joinedMidPerformance,
                performanceReady
              } = this.props;

              if (!performanceReady || joinedMidPerformance) {
                await client.mutate({
                  mutation: sendPerformanceReady,
                  variables: {
                    channelName
                  }
                });
              }
            } catch (error) {
              console.log("error", error);
              console.log("RemoteVideo - onPlay");
            }
          }}
          style={reactPlayerStyle}
        />
      </Fragment>
    );
  }
}

export default withApollo(RemoteVideo);
