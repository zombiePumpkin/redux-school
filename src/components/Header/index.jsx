import React from "react";

// routes
import { Link } from "react-router-dom";

// assets
import { FaHome, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Nav } from "./styled";

export default function Header() {
  // eslint-disable-next-line no-unused-vars
  const btnClick = useSelector((state) => state.btnClick);

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/">
        <FaSignInAlt size={24} />
        {btnClick ? "Clicado" : "Não clicado"}
      </Link>
    </Nav>
  );
}
