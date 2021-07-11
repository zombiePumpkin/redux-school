import styled, { createGlobalStyle } from 'styled-components'
import * as colors from '../config/colors'
import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    background-color: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
  }
  html, border-style, #root {
    width: 100%;
    height: 100%;
  }
  button {
    cursor: pointer;
    background-color: ${colors.primaryColor};
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
  }
  a {
    text-align: none;
    color: ${colors.primaryColor};
  }
  ul {
    list-style: none;
  }
  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background-color: ${colors.successColor};
  }
  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background-color: ${colors.errorColor};
  }
  body .Toastify .Toastify__toast-container .Toastify__toast--warning {
    background-color: ${colors.warningColor};
  }
`;

export const Container = styled.section`
  max-width: 380px;
  height: auto;
  background-color: #fff;
  margin: 30px auto;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(1, 1, 1, 0.15);

  h1 {
    width: 100%;
    height: auto;
    text-align: center;
  }
`;
