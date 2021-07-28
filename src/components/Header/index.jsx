import React from "react";

// routes
import { Link } from "react-router-dom";

// hooks
import { useDispatch, useSelector } from "react-redux";

import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from "react-icons/fa";
import * as actions from "../../store/modules/auth/actions";
import history from "../../services/history";

// assets
import { Nav } from "./styled";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  function handleLogout(evt) {
    evt.preventDefault();
    dispatch(actions.loginFailure());
    history.push("/login");
  }

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={24} color="#66ff33" />}
    </Nav>
  );
}
