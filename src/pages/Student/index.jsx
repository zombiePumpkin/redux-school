import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isEmail, isInt, isFloat } from "validator";
import { toast } from "react-toastify";
import { get } from "lodash";
// import { useDispatch } from "react-redux";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "../../services/axios";
import history from "../../services/history";
// import * as actions from "../../store/modules/auth/actions";

// components
import { Container } from "../../styles/GlobalStyles";
import { Form, ProfilePicture } from "./styled";
import Loading from "../../components/Loading";

export default function Student({ match }) {
  // const dispatch = useDispatch();
  const id = get(match, "params.id", 0);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [photo, setPhoto] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        const Photo = get(data, "Photos[0].url", "");
        setPhoto(Photo);

        setName(data.student.name);
        setLastname(data.student.lastname);
        setEmail(data.student.email);
        setAge(data.student.age);
        setWeight(data.student.weight);
        setHeight(data.student.height);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, "response.status", 0);
        const errors = get(err, "response.data.errors", []);
        console.log(status);
        console.log(errors);

        if (status === 400) {
          errors.map((error) => toast.error(error));
        }
        history.push("/");
      }
    }

    getData();
  }, [id]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error("Nome precisa ter entre 3 e 255 caracteres");
    }

    if (lastname.length < 3 || lastname.length > 255) {
      formErrors = true;
      toast.error("Sobrenome precisa ter entre 3 e 255 caracteres");
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Email inválido");
    }

    if (!isInt(String(age))) {
      formErrors = true;
      toast.error("Idade inválida");
    }

    if (!isFloat(String(weight))) {
      formErrors = true;
      toast.error("Peso inválido");
    }

    if (!isFloat(String(height))) {
      formErrors = true;
      toast.error("Altura inválida");
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`/students/${id}`, {
          name,
          lastname,
          email,
          age,
          weight,
          height,
        });

        toast.success("Aluno atualizado com sucesso!");
      } else {
        const { data } = await axios.post(`/students/`, {
          name,
          lastname,
          email,
          age,
          weight,
          height,
        });

        toast.success("Aluno criado com sucesso!");
        history.push(`/student/${data.created.id}/edit`);
      }

      setIsLoading(false);
    } catch (err) {
      // const status = get(err, "response.status", 0);
      const data = get(err, "response.data", {});
      const errors = get(data, "errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      }

      // if (status === 401) dispatch(actions.loginFailure());

      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? "Editar Aluno" : "Aluno"}</h1>

      {id && (
        <ProfilePicture>
          {photo ? <img src={photo} alt={name} /> : <FaUserCircle size={125} />}
          <Link to={`/photos/${id}`}>
            <FaEdit size={16} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />

        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Sobrenome"
        />

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Idade"
        />

        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Peso"
        />

        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
