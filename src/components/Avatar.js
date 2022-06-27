import md5 from "md5";
import { Image } from "react-bootstrap";

export default function Avatar({ size = 40, user, useFor }) {
  const avatar = `https://eu.ui-avatars.com/api/?name=${user}}&size=${size}&rounded=true&${
    useFor === "navbar"
      ? "background=59e4a8&color=1c3144"
      : "background=random&color=random"
  }`;

  const hash = md5(user);

  const avatarGravicon = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;

  return (
    <Image
      className={!useFor /*&& "d-none d-md-block"*/}
      style={{ minHeight: size, aspectRati: 1 / 1 }}
      src={avatarGravicon}
      roundedCircle
    />
  );
}
