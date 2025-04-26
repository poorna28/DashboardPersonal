import React, { useState } from "react";
import axios from "axios";

const initialEmployee = {
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    supervisorName: "",
    supervisorPhone: ""
};

function AddEmployee(props) {
    const [employeeInfo, setEmployeeInfo] = useState(initialEmployee);

    const addNewEmployee = async () => {
        try {
            const response = await axios.post('http://localhost:3036/employees', employeeInfo);
            if (response) {
                props.setEmployeeAdded();
            }
        } catch (e) {
            console.log(e);
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
                            value={employeeInfo.name}
                            className="form-group"
                            placeholder="Enter employee's name"
                            onChange={(e) => setEmployeeInfo({ ...employeeInfo, name: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Email:</span>
                        <input
                            type="email"
                            value={employeeInfo.email}
                            className="form-group"
                            placeholder="Enter employee's email"
                            onChange={(e) => setEmployeeInfo({ ...employeeInfo, email: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Phone Number:</span>
                        <input
                            type="text"
                            value={employeeInfo.phone}
                            className="form-group"
                            placeholder="Enter employee's phone number"
                            onChange={(e) => setEmployeeInfo({ ...employeeInfo, phone: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Job Title:</span>
                        <input
                            type="text"
                            value={employeeInfo.jobTitle}
                            className="form-group"
                            placeholder="Enter job title"
                            onChange={(e) => setEmployeeInfo({ ...employeeInfo, jobTitle: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Department:</span>
                        <input
                            type="text"
                            value={employeeInfo.department}
                            className="form-group"
                            placeholder="Enter department"
                            onChange={(e) => setEmployeeInfo({ ...employeeInfo, department: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Supervisor Name:</span>
                        <input
                            type="text"
                            value={employeeInfo.supervisorName}
                            className="form-group"
                            placeholder="Enter supervisor name"
                            onChange={(e) => setEmployeeInfo({ ...employeeInfo, supervisorName: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Supervisor Phone:</span>
                        <input
                            type="text"
                            value={employeeInfo.supervisorPhone}
                            className="form-group"
                            placeholder="Enter supervisor phone"
                            onChange={(e) => setEmployeeInfo({ ...employeeInfo, supervisorPhone: e.target.value })}
                        />
                    </p>
                </div>
            </div>
            <button className="btn btn-secondary" onClick={addNewEmployee}>Add Employee</button>
        </div>
    );
}

export default AddEmployee;
