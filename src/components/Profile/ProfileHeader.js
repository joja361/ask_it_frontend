import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { authData } from "../../store/authSlice";
import { convertDateToUserSince } from "../../utils/time";
import Avatar from "../Avatar";
import ChangePasswordModal from "../Modal/ChangePasswordModal";

export default function ProfileHeader({ id, email, name, createdAt }) {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useSelector(authData);
  const { userId: loggedUserId } = user;

  const userSince = convertDateToUserSince(createdAt);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      {openModal && <ChangePasswordModal handleModal={handleModal} />}
      <div className="d-flex justify-content-between">
        <div className="profile">
          {email && <Avatar user={email} size={200} />}
          <h1 className="text-center profile-name">{name || email}</h1>
        </div>
        {loggedUserId === id && (
          <Button variant="outline-primary" onClick={handleModal}>
            Change Password
          </Button>
        )}
      </div>
      <p className="profile-user-since">{userSince}</p>
    </>
  );
}
