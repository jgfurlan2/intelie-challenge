import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;

    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  #root {
    display: flex;
    justify-content: flex-start;

    width: 100%;
  }

  *, button, input, textarea {
    outline: 0;
    font: 14px "Source Code Pro",  monospace;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::placeholder, ::-ms-input-placeholder, :-ms-input-placeholder {
    font-family: "Source Sans Pro", sans-serif;
  }
`;
