import styledNormalize from "styled-normalize";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
${styledNormalize}
body {
    font-family: 'Arial', sans-serif;
  }
`;

export default GlobalStyles;
