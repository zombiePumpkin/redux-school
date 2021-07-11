import React from "react";

// styled components
import { useDispatch } from "react-redux";
import { Title } from "./styled";
import { Container } from "../../styles/GlobalStyles";

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch({
      type: "BOTAO_CLICADO",
    });
  }

  return (
    <Container>
      <Title isRed>
        Login
        <small>wellcome</small>
      </Title>
      <p>Lorem ipsum</p>
      <button type="button" onClick={handleClick}>
        clique aqui
      </button>
    </Container>
  );
}
