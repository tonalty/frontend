import { createGlobalStyle } from "styled-components";

interface Theme {
  body: string;
  text: string;
  bgCommunityListItem: string;
}

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: { theme: Theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  .gbLi {
    background-image: ${({ theme }) => theme.bgCommunityListItem};
  }
`;
