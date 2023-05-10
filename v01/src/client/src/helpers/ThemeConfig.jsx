import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  text: "#000",
  toggleBorder: "#fff",
  gradient: "linear-gradient(#8a8639, #eddd79)",
};

export const darkTheme = {
  body: "#060606",
  text: "#fff",
  toggleBorder: "#6B8096",
  gradient: "linear-gradient(#313609, #5d5a1e)",
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.text};
    box-shadow: ${({ theme }) => theme.text};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }

  ul {
    list-style: none;
  }

  button {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  svg {
    color: ${({ theme }) => theme.text};
  }
`;
