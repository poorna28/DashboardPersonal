import React, { useEffect, useState } from "react";
import api from "../services/api";

const initialUser = {
  name: " ",
  email: " ",
  mobile_number: " "
};

function VisibleUser({ userId }) {
  const [userInfo, setUserInfo] = useState(initialUser);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
  try {
    console.log("Fetching user with ID:", userId);
    const response = await api.getStudentById(userId);
    console.log("User data received:", response.data);
    setUserInfo(response.data[0]);
  } catch (e) {
    console.log("Error fetching user:", e);
  }
};


  return (
    <div className="main-view">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <p>
            <span>Name:</span>
            <span>{userInfo.name}</span>
          </p>
        </div>
        <div className="col-sm-12 col-md-6">
          <p>
            <span>Email:</span>
            <span>{userInfo.email}</span>
          </p>
        </div>
        <div className="col-sm-12 col-md-6">
          <p>
            <span>Phone Number:</span>
            <span>{userInfo.mobile_number}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VisibleUser;
