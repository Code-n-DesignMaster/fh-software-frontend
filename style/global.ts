import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import { font } from './typography';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    background: ${theme.color.background.dark};
  }

  html {
    font-size: 62.5%;
    text-rendering: optimizeLegibility;
  }

  body {
    font-size: 1.4rem;
    font-family: ${font.base};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ul,
  ol {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
`;

export default GlobalStyle;
