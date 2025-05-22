import React, { useState } from "react";
import api from "../services/api";

const initialUser = {
  name: "",
  email: "",
  mobile_number: ""
};

function AddUser({ setUserAdded }) {
  const [userInfo, setUserInfo] = useState(initialUser);

  const addNewUser = async () => {
    try {
      const response = await api.addstudentData(userInfo);
      if (response) {
        setUserAdded();
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
              value={userInfo.phone}
              className="form-group"
              placeholder="Enter your number"
              onChange={(e) => setUserInfo({ ...userInfo, mobile_number: e.target.value })}
            />
          </p>
        </div>
      </div>
      <button className="btn btn-secondary" onClick={addNewUser}>Add User</button>
    </div>
  );
}

export default AddUser;
