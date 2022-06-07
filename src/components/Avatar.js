import React, { useMemo } from "react";
import { Image } from "react-bootstrap";

export default function Avatar({ size = 45, user }) {
  console.log(user);

  const avatar = `https://eu.ui-avatars.com/api/?name=${user}}&size=${size}&rounded=true&background=59e4a8&color=1c3144`;

  return <Image src={avatar} />;
}
