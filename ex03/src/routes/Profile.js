import React from "react";
import { authService } from '../fbInstance';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    authService.signOut()
        .then(() => navigate("/"))
        .catch(error => console.error("ERROR:", error));

  }

  return (
      <>
        <button onClick={onLogoutClick}>Logout</button>
      </>
  );

};

export default Profile;