import React, { useMemo } from "react";
import { Image } from "react-bootstrap";

export default function Avatar({ size = 40, user, useFor }) {
  const avatar = `https://eu.ui-avatars.com/api/?name=${user}}&size=${size}&rounded=true&${
    useFor === "navbar"
      ? "background=59e4a8&color=1c3144"
      : "background=random&color=random"
  }`;

  return <Image className={!useFor && "d-none d-md-block"} src={avatar} />;
}
