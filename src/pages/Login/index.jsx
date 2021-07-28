import React, { useState } from "react";
import { toast } from "react-toastify";
import { get } from "lodash";
import { isEmail } from "validator";
import { useDispatch, useSelector } from "react-redux";

// * components
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import * as actions from "../../store/modules/auth/actions";
import Loading from "../../components/Loading";

export default function Login(props) {
  const dispatch = useDispatch();
  const prevPath = get(props, "location.state.prevPath", "/");
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Email inválido");
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error("Senha deve ter entre 6 e 50 caracteres");
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />

        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}
