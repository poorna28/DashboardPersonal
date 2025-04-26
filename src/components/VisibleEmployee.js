import React, { useEffect, useState } from "react";
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

function VisibleEmployee(props) {
    const [employeeInfo, setEmployeeInfo] = useState(initialEmployee);

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
            const response = await axios.get('http://localhost:3036/employees/' + props.employeeId);
            if (response) {
                setEmployeeInfo(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="main-view">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Name:</span>
                        <span>{employeeInfo.name}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Email:</span>
                        <span>{employeeInfo.email}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Phone Number:</span>
                        <span>{employeeInfo.phone}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Job Title:</span>
                        <span>{employeeInfo.jobTitle}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Department:</span>
                        <span>{employeeInfo.department}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Supervisor Name:</span>
                        <span>{employeeInfo.supervisorName}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Supervisor Phone:</span>
                        <span>{employeeInfo.supervisorPhone}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VisibleEmployee;
