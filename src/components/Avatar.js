import React from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../store/authSlice";

function Avatar({ size = 45 }) {
  const { email, displayName } = useSelector(userData);

  const avatar = `https://eu.ui-avatars.com/api/?name=${
    displayName || email
  }}&size=${size}&rounded=true&background=59e4a8&color=1c3144`;

  return <Image src={avatar} />;
}

export default Avatar;
