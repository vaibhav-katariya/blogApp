import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((data) => data.user.user);
  console.log(user);

  return (
    <div>
      <h1>Profile page here</h1>
    </div>
  );
};

export default Profile;
