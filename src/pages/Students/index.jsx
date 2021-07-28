import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";

// * assets
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";
import axios from "../../services/axios";

// * components
import { Container } from "../../styles/GlobalStyles";
import { StudentContainer, ProfilePicture } from "./styled";
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

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>
      <StudentContainer>
        {students.map((student) => (
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

            <Link to={`/student/${student.id}/delete`}>
              <FaWindowClose size={14} />
            </Link>
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
