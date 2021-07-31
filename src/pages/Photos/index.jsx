import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { get } from "lodash";
import axios from "../../services/axios";
import history from "../../services/history";

// components
import { Container } from "../../styles/GlobalStyles";
import { Title, Form } from "./styled";
import Loading from "../../components/Loading";

export default function Photos({ match }) {
  const id = get(match, "params.id", "");

  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        const userPhoto = get(data, "student.Photos[0].url", "");
        setPhoto(userPhoto);
        setIsLoading(false);
      } catch (err) {
        toast.error("Erro ao obter imagem");
        history.push("/");
        setIsLoading(false);
      }
    };

    getData();
  }, [id]);

  async function handlePhoto(evt) {
    const upload = evt.target.files[0];
    const uploadURL = URL.createObjectURL(upload);

    console.log(upload, uploadURL);

    setPhoto(uploadURL);

    const formData = new FormData();
    formData.append("student_id", id);
    formData.append("upload", upload);

    try {
      setIsLoading(true);
      axios.post("/photos/", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      toast.success("Foto enviada com sucesso");
      setIsLoading(false);
    } catch (err) {
      const { errors } = get(err, "response", "");
      errors.map((error) => toast.error(error));
    }

    setIsLoading(false);
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>
      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt="profile" /> : "Selecionar"}
          <input type="file" id="photo" onChange={(evt) => handlePhoto(evt)} />
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
