import React, { Component } from "react";
import ReactDOM from "react-dom";
import StartPerformerModal from "../common/StartPerformerModal";
import swal from "sweetalert";
import { withApollo } from "react-apollo";

import { Button, FlatButton } from "../common/styled-components/general";
import { media } from "styled-bootstrap-grid";
import { establishLocalStream } from "../home/agora";
import { checkIfUserLoggedIn, checkIfUserHasCameraAndMic } from "../utility";
import styled from "styled-components";

const StyledStartPerformerButton = styled(Button)`
  background-color: ${props => props.theme.color.blue};
  border-color: ${props => props.theme.color.darkBlue};
  display: none;
  cursor: ${props => props.disabled && "not-allowed"};
  opacity: ${props => props.disabled && 0.5};
  ${media.tablet`
    display: inline-flex;
  `};
`;

const StyledMobileStartPerformerButton = styled(FlatButton)`
  background-color: ${props => props.theme.color.blue};
  border-color: ${props => props.theme.color.darkBlue};
  cursor: ${props => props.disabled && "not-allowed"};
  opacity: ${props => props.disabled && 0.5};
  ${media.tablet`
    display: none;
  `};
`;

class StartPerformerButton extends Component {
  state = { disabled: false };

  handleStartPerformerClick = async () => {
    const { client, channelName } = this.props;
    const wrapper = document.createElement("div");
    ReactDOM.render(<StartPerformerModal />, wrapper);
    const content = wrapper;

    let input = await swal({
      content,
      buttons: {
        cancel: true,
        confirm: {
          text: "Let's do this!",
          value: JSON.stringify({ allowPerformerMessages: true })
        }
      }
    });

    input = JSON.parse(input);

    if (!input) {
      //means the user canceled
      this.setState({ disabled: false });
      return;
    }

    establishLocalStream(client, channelName, input)
      .then()
      .catch(err => {
        console.log("err", err);

        if (err.msg === "NotReadableError") {
          this.setState({ disabled: false });

          swal(
            "Ut oh!",
            "You cannot publish video/audio from this device. Please try a different device",
            "error"
          );
          return;
        }

        if (err.msg === "NotAllowedError") {
          this.setState({ disabled: false });

          swal(
            "Ut oh!",
            "You must allow the browser to access your camera and microphone to perform.",
            "error"
          );
          return;
        }
      });
  };

  renderButtonText = () => {
    const { loading, currentPerformer, userIsCurrentPerformer } = this.props;

    if (loading) {
      return "Loading...";
    }

    if (currentPerformer && !userIsCurrentPerformer) {
      return "Add Me To The Lineup";
    } else {
      return "Perform Now";
    }
  };

  render() {
    const { renderButtonText, handleStartPerformerClick } = this;
    const { mobile, loading } = this.props;
    const { disabled } = this.state;

    if (mobile) {
      return (
        <StyledMobileStartPerformerButton
          onClick={async () => {
            this.setState({ disabled: true });

            const userHasCameraAndMic = await checkIfUserHasCameraAndMic();

            if (!userHasCameraAndMic) {
              swal(
                "Ut oh!",
                "We cannot access your camera and microphone",
                "error"
              );

              this.setState({ disabled: false });
              return;
            }

            const userLoggedIn = await checkIfUserLoggedIn();

            if (!userLoggedIn) {
              this.setState({ disabled: false });
              return;
            }

            await handleStartPerformerClick();
          }}
          disabled={disabled}
        >
          {renderButtonText()}
        </StyledMobileStartPerformerButton>
      );
    }

    return (
      <StyledStartPerformerButton
        disabled={disabled || loading}
        onClick={async () => {
          this.setState({ disabled: true });

          const userHasCameraAndMic = await checkIfUserHasCameraAndMic();

          if (!userHasCameraAndMic) {
            swal(
              "Ut oh!",
              "We cannot access your camera and microphone",
              "error"
            );

            this.setState({ disabled: false });
            return;
          }

          const userLoggedIn = await checkIfUserLoggedIn();

          if (!userLoggedIn) {
            this.setState({ disabled: false });
            return;
          }

          await handleStartPerformerClick();
        }}
      >
        {renderButtonText()}
      </StyledStartPerformerButton>
    );
  }
}

export default withApollo(StartPerformerButton);
