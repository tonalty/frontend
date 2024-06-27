import { createGlobalStyle } from 'styled-components';

interface Theme {
  body: string;
  text: string;
}

export const GlobalStyles = createGlobalStyle`
  html {
    padding: 0 !important;
  }

  body {
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
