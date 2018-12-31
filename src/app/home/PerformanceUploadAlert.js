import React, { Component } from "react";
import styled from "styled-components";
import posed from "react-pose";

const PosedPerformanceUploadAlert = posed.div({
  show: {
    x: "0%",
    transition: { type: "tween", duration: 400 }
  },
  hide: {
    x: "100%",
    transition: { type: "tween", duration: 400 }
  }
});

const StyledPerformanceUploadAlert = styled(PosedPerformanceUploadAlert)`
  display: block;
  background-color: ${props => props.theme.color.blue};
  color: white;
  z-index: 1;
  right: 0;
  /* height: calc(100% - 64.19px); */
  position: fixed;
  width: 16rem;
  padding: 1rem;
  overflow-y: auto;
  text-align: center;
  line-height: 1.5rem;
`;

const StyledPerformanceUploadAlertHeader = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
`;

const StyledProgressBar = styled.div`
  margin-top: 1rem;
  height: 20px;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${props => props.theme.color.darkGreen};
  position: relative;
`;

const StyledFiller = styled.div`
  background: ${props => props.theme.color.lightGreen};
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
  width: ${props => `${props.percentage}%`};
`;

export default class PerformanceUploadAlert extends Component {
  render() {
    const { performanceUploadProgress } = this.props;

    return (
      <StyledPerformanceUploadAlert
        pose={performanceUploadProgress ? "show" : "hide"}
      >
        <div>
          <StyledPerformanceUploadAlertHeader>
            {performanceUploadProgress === 100
              ? "Performance Upload Complete!"
              : "Uploading Your Performance"}
          </StyledPerformanceUploadAlertHeader>
        </div>
        <StyledProgressBar>
          <StyledFiller percentage={performanceUploadProgress} />
        </StyledProgressBar>
      </StyledPerformanceUploadAlert>
    );
  }
}
