import styled from "styled-components";
import { capitalize } from "../../../utility";

const Button = styled.button`
  border-style: solid;
  border-width: 0px 0px 3px;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
  color: white;
  border-radius: 0.25rem;
  font-style: normal;
  overflow: hidden;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  padding: 0.75rem;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border-color: ${props =>
    props.color
      ? props["theme"]["color"][`dark${capitalize(props.color)}`]
      : props.theme.color.darkGrey};
  background-color: ${props =>
    props.color
      ? props["theme"]["color"][`${props.color}`]
      : props.theme.color.grey};
  opacity: ${props => (props.disabled ? "0.5" : "1")};

  &:active {
    transform: translateY(3px);
  }
`;

export default Button;
