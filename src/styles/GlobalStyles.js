import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  body {
    background: linear-gradient(to bottom, rgba(255, 64, 64, 0.2), rgba(255, 92, 141, 0.8)),
      url('https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=620');
    background-size: cover;
    background-position: center;    background-repeat: no-repeat;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    backdrop-filter: blur(3px) brightness(0.7);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export default GlobalStyles;