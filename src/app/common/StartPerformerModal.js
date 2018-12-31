import React, { Component } from "react";
import swal from "sweetalert";
import styled from "styled-components";
import store from "../store";
import { Creators as homeCreators } from "../home/duck/actions";

const StyledSelect = styled.select`
  cursor: pointer;
  position: relative;
  display: inline-block;
  outline: none;
  text-align: left;
  background: #fff;
  width: 100%;
`;

const StyledOptionsWrapper = styled.div`
  margin-top: 1rem;
`;

const StyledOptionsHeader = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export default class StartPerformerModal extends Component {
  state = {
    allowPerformerMessages: true,
    loading: true,
    recordingDevices: [],
    cameras: []
  };

  componentDidMount = () => {
    const {
      home: { agoraClient }
    } = store.getState();

    agoraClient.getRecordingDevices(recordingDevices => {
      agoraClient.getPlayoutDevices(playoutDevices => {
        agoraClient.getCameras(cameras => {
          store.dispatch(homeCreators.setCameras(cameras));
          store.dispatch(homeCreators.setRecordingDevices(recordingDevices));
          store.dispatch(
            homeCreators.setMicrophone(recordingDevices[0].deviceId)
          );
          store.dispatch(homeCreators.setCamera(cameras[0].deviceId));
          this.setState({ recordingDevices, cameras, loading: false });
        });
      });
    });
  };

  handleSelectChange = e => {
    const { id, value } = e.target;
    if (id === "audio") {
      store.dispatch(homeCreators.setMicrophone(value));
    }

    if (id === "video") {
      store.dispatch(homeCreators.setCamera(value));
    }
  };

  render() {
    const { handleSelectChange } = this;
    const { recordingDevices, cameras, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div>
          <StyledOptionsWrapper>
            <StyledOptionsHeader>Choose your camera</StyledOptionsHeader>
            <StyledSelect id="video" onChange={handleSelectChange}>
              {cameras.map((camera, i) => {
                return (
                  <option key={camera.deviceId} value={camera.deviceId}>
                    {camera.label ? camera.label : camera.deviceId}
                  </option>
                );
              })}
            </StyledSelect>
          </StyledOptionsWrapper>
          <StyledOptionsWrapper>
            <StyledOptionsHeader>Choose your microphone</StyledOptionsHeader>
            <StyledSelect id="audio" onChange={handleSelectChange}>
              {recordingDevices.map((recordingDevice, i) => {
                return (
                  <option
                    value={recordingDevice.deviceId}
                    key={recordingDevice.deviceId}
                  >
                    {recordingDevice.label
                      ? recordingDevice.label
                      : recordingDevice.deviceId}
                  </option>
                );
              })}
            </StyledSelect>
          </StyledOptionsWrapper>
          <StyledOptionsWrapper>
            <input
              type="checkbox"
              id="performerMessages"
              name="performerMessages"
              value={"performerMessages"}
              checked={this.state.allowPerformerMessages}
              style={{ margin: "0.4rem" }}
              onChange={() => {
                this.setState(
                  ({ allowPerformerMessages }) => ({
                    allowPerformerMessages: !allowPerformerMessages
                  }),
                  () => {
                    swal.setActionValue(
                      JSON.stringify({
                        allowPerformerMessages: this.state
                          .allowPerformerMessages
                      })
                    );
                  }
                );
              }}
            />
            <label htmlFor="performerMessages">
              Allow viewers to message you during performance?
            </label>
          </StyledOptionsWrapper>
        </div>
        <hr />
        <div>
          <h3>Performer Rules</h3>
          <ul>
            <li>No nudity</li>
            <li>No violence</li>
            <li>Be respectful to others</li>
          </ul>
        </div>
      </div>
    );
  }
}
