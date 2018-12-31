import React, { Component, Fragment } from "react";
import styled from "styled-components";
import ContentLoader from "react-content-loader";

const StyledUserImage = styled.img`
  height: 100%;
  width: 100%;
`;

export default class UserImage extends Component {
  state = { imageLoaded: false };

  handleImageLoaded = () => {
    this.setState({ imageLoaded: true });
  };

  render() {
    const { handleImageLoaded } = this;
    const { picture } = this.props;
    const { imageLoaded } = this.state;

    return (
      <Fragment>
        {!imageLoaded && (
          <ContentLoader
            width={200}
            height={200}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="0" ry="0" width="200" height="200" />
          </ContentLoader>
        )}
        <StyledUserImage
          src={picture}
          alt="User Profile Photo"
          style={{ display: imageLoaded ? "inline" : "none" }}
          onLoad={handleImageLoaded}
        />
      </Fragment>
    );
  }
}
