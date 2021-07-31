import styled from 'styled-components'
import * as colors from '../../config/colors'

export const Title = styled.h1`
  background: ${props => props.isRed ? 'red' : 'blue'};
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;

  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  margin-top: 30px;
  position: relative;

  img {
    width: 125px;
    height: 125px;
    border-radius: 50%;
  }

  a{
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background-color: ${colors.primaryColor};
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
