import styled from "styled-components";

const Label = styled.div`
  display: inline-block;
  vertical-align: baseline;
  padding: 0.5rem;
  font-weight: 600;
  color: white;
  background-color: ${props => props.theme.color.grey};
  vertical-align: middle;
  font-size: ${props => props.theme.fontSize.textSm};
`;

export default Label;
