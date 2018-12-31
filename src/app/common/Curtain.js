import React, { Component } from "react";
import styled from "styled-components";
import ShowInfo from "../home/ShowInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledCurtain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.darkestRed};
  flex-grow: 1;
  color: white;
  flex-direction: column;
`;

const Loading = styled.span`
  visibility: ${props => (props.loading ? "visible" : "hidden")};
`;

const ShowWrapper = styled.div`
  padding: 1rem;
  margin: 1rem;
  border: 1px solid white;
  border-radius: 0.25rem;
`;

const ShowDescriptor = styled.div``;

class Curtain extends Component {
  renderLoadingText = () => {
    const { viewer, performer } = this.props;

    if (viewer) {
      return "Connecting to performer...";
    }

    if (performer) {
      return "Connecting to viewers...";
    }

    return (
      <div style={{ fontSize: "3rem", fontWeight: 700 }}>
        <FontAwesomeIcon icon={["far", "ellipsis-h"]} pulse />
      </div>
    );
  };

  render() {
    const { renderLoadingText } = this;
    const { errorMessages, loading, setShow, show } = this.props;

    return (
      <StyledCurtain>
        <div style={{ width: "25rem", textAlign: "center" }}>
          <img
            src="/images/curtncall_logo.svg"
            alt="CurtnCall Logo"
            style={{ width: "75%", height: "auto" }}
          />

          {errorMessages && errorMessages.length > 0 && (
            <ShowDescriptor>
              {errorMessages.map((errorMessage, i) => {
                return (
                  <div style={{ marginTop: "1rem" }} key={errorMessage}>
                    {errorMessage}
                  </div>
                );
              })}
            </ShowDescriptor>
          )}
          {show && (
            <ShowWrapper>
              <ShowInfo setShow={setShow} show={show} removeBulletPoints />
            </ShowWrapper>
          )}
          <div style={{ marginTop: "1rem" }}>
            <Loading loading={loading}>{renderLoadingText()}</Loading>
          </div>
        </div>
      </StyledCurtain>
    );
  }
}

export default Curtain;
