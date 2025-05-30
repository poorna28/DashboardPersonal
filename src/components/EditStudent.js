import React, { useEffect, useState } from "react";
import api from "../services/api";

const initialUser = {
  id: "",
  name: "",
  email: "",
  mobile_number: ""
};

function EditUser({ userId, setUserEdited }) {
  const [userInfo, setUserInfo] = useState(initialUser);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.getStudentById(userId);
      if (response) {
        setUserInfo(response.data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const editOldUser = async () => {
    try {
      const response = await api.editStudentsData(userId, userInfo);
      if (response) {
        setUserEdited();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="main-view-addbtn">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <p>
            <span>Name:</span>
            <input
              type="text"
              value={userInfo.name}
              className="form-group"
              placeholder="Enter your name"
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
          </p>
        </div>
        <div className="col-sm-12 col-md-6">
          <p>
            <span>Email:</span>
            <input
              type="email"
              value={userInfo.email}
              className="form-group"
              placeholder="Enter your email"
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
          </p>
        </div>
        <div className="col-sm-12 col-md-6">
          <p>
            <span>Phone Number:</span>
            <input
              type="number"
              value={userInfo.mobile_number}
              className="form-group"
              placeholder="Enter your number"
              onChange={(e) => setUserInfo({ ...userInfo, mobile_number: e.target.value })}
            />
          </p>
        </div>
      </div>
      <button className="btn btn-secondary" onClick={editOldUser}>Update User</button>
    </div>
  );
}

export default EditUser;
