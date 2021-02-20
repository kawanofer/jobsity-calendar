import { createGlobalStyle } from 'styled-components';
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


  ul {
    list-style: none;
  }


  button {
    cursor: pointer;
  }

	.MuiTableCell-body {
    font-family: 'Open Sans',sans-serif;
	}

	.MuiTableCell-head {
    font-family: 'Open-sans',sans-serif;
	}
	.MuiButton-text span {
    font-family: 'Open-sans',sans-serif;
	}
	.MuiToolbar-root.MuiToolbar-regular.MuiTablePagination-toolbar.MuiToolbar-gutters p {
    font-family: 'Open-sans',sans-serif;
	}
	.PopoverPopupState-typography-96 {
    font-family: 'Open-sans', sans-serif;
	}
  #alert-dialog-title {
    > h2 {

    display: flex;
    justify-content: space-between;
    align-items: center;
    }
  }
`;
