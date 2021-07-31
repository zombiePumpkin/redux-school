import styled from 'styled-components'
import * as colors from '../../config/colors'

export const Title = styled.h1`
`;

export const Form = styled.form`
  label {
    display: none;
    width: 125px;
    height: 125px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    border: 5px dashed ${colors.primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }

  img {
    width: 125px;
    height: 125px;
  }

  input {
    display: none;
  }
`;

