import React from "react";
import { Label as StyledComponentLabel } from "./styled-components/general";
import styled from "styled-components";

const StyledLabel = styled(StyledComponentLabel)`
  background-color: ${props => props.theme.color[`${props.color}`]};
  cursor: pointer;
`;

const Label = ({ color, children }) => {
  return <StyledLabel color={color}>{children}</StyledLabel>;
};

export default Label;
