import { createGlobalStyle } from 'styled-components';

interface Theme {
  body: string;
  text: string;
}

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    padding: 0 !important;
  }

  body {
    height: 100%;
    background: ${({ theme }: { theme: Theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    max-width: 480px;
    display: flex;
    margin: 0 auto;
  }

  #root {
    margin: 0 auto;
    width: 100%;
  }
`;
