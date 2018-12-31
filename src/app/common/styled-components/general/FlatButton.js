import Button from "./Button";
import styled from "styled-components";

const FlatButton = styled(Button)`
  width: 100%;
  padding: 0.75rem;
  margin: 0;
  border-radius: 0;
  border: ${props =>
    props.buttonGroup ? `1px solid ${props.theme.color.black}` : 0};
`;

export default FlatButton;
