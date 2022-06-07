import React from "react";
import { Image } from "react-bootstrap";
import { getTokenAndUser } from "../utils/token";

function Avatar({ size = 45 }) {
  const { email } = getTokenAndUser();

  const avatar = `https://eu.ui-avatars.com/api/?name=${email}}&size=${size}&rounded=true&background=59e4a8&color=1c3144`;

  return <Image src={avatar} />;
}

export default Avatar;
