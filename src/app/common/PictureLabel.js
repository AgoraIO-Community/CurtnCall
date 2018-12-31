import React from "react";
import styled from "styled-components";
import Label from "./Label";

const LabelImage = styled.img`
  height: 1rem;
  width: 1rem;
  vertical-align: middle;
`;

const PictureLabel = ({ picture, children, color }) => {
  return (
    <Label color={color}>
      <LabelImage src={picture} /> {children}
    </Label>
  );
};

export default PictureLabel;
