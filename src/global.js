import { createGlobalStyle } from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #F5F5F5;
    color: #2c3e50;
    font-family: "Avenir Next Pro Regular", sans-serif;
    -webkit-font-smoothing: antialiased !important;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body, input, button {
    font-family: "Avenir Next Pro Regular", sans-serif;
  }

  a {
    text-decoration: none;
  }

`;
