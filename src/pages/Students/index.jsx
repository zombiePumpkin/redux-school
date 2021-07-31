import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";

// * assets
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "../../services/axios";

// * components
import { Container } from "../../styles/GlobalStyles";
import { StudentContainer, ProfilePicture, CreateStudent } from "./styled";
import Loading from "../../components/Loading";

// * main function
export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const resp = await axios.get("/students");
      setStudents(resp.data.students);
      setIsLoading(false);
    }

    getData();
  }, []);

  function handleAsk(evt) {
    evt.preventDefault();
    const exclamation = evt.currentTarget.nextSibling;
    exclamation.setAttribute("display", "block");
  }

  async function handleDelete(evt, id, i) {
    try {
      setIsLoading(true);
      await axios.delete(`/students/${id}`);
      const newStudents = [...students];
      newStudents.splice(i, 1);
      setStudents(newStudents);
      setIsLoading(false);
    } catch (err) {
      const errors = get(err, "response.data.errors", []);
      errors.map((erro) => toast.error(erro));
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>
      <CreateStudent to="/student/">New student</CreateStudent>
      <StudentContainer>
        {students.map((student, i) => (
          <div key={student.id.toString()}>
            <ProfilePicture>
              {get(student, "Photos[0].url", false) ? (
                <img src={student.Photos[0].url} alt="profile" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{student.name}</span>
            <span>{student.email}</span>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link onClick={handleAsk} to={`/student/${student.id}/delete`}>
              <FaWindowClose size={14} />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(evt) => handleDelete(evt, student.id, i)}
            />
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
