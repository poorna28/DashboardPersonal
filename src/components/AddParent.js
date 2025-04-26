import React, { useState } from "react";
import axios from "axios";

const initialParent = {
    name: "",
    email: "",
    phone: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: ""
};

function AddParent(props) {
    const [parentInfo, setParentInfo] = useState(initialParent);

    const addNewParent = async () => {
        try {
            const response = await axios.post('http://localhost:3035/parents', parentInfo);
            if (response) {
                props.setParentAdded();
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
                            value={parentInfo.name}
                            className="form-group"
                            placeholder="Enter parent's name"
                            onChange={(e) => setParentInfo({ ...parentInfo, name: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Email:</span>
                        <input
                            type="email"
                            value={parentInfo.email}
                            className="form-group"
                            placeholder="Enter parent's email"
                            onChange={(e) => setParentInfo({ ...parentInfo, email: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Phone Number:</span>
                        <input
                            type="text"
                            value={parentInfo.phone}
                            className="form-group"
                            placeholder="Enter parent's phone number"
                            onChange={(e) => setParentInfo({ ...parentInfo, phone: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Occupation:</span>
                        <input
                            type="text"
                            value={parentInfo.occupation}
                            className="form-group"
                            placeholder="Enter occupation"
                            onChange={(e) => setParentInfo({ ...parentInfo, occupation: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Emergency Contact Name:</span>
                        <input
                            type="text"
                            value={parentInfo.emergencyContactName}
                            className="form-group"
                            placeholder="Enter emergency contact name"
                            onChange={(e) => setParentInfo({ ...parentInfo, emergencyContactName: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Emergency Contact Relationship:</span>
                        <input
                            type="text"
                            value={parentInfo.emergencyContactRelationship}
                            className="form-group"
                            placeholder="Enter relationship"
                            onChange={(e) => setParentInfo({ ...parentInfo, emergencyContactRelationship: e.target.value })}
                        />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Emergency Contact Phone:</span>
                        <input
                            type="text"
                            value={parentInfo.emergencyContactPhone}
                            className="form-group"
                            placeholder="Enter emergency contact phone"
                            onChange={(e) => setParentInfo({ ...parentInfo, emergencyContactPhone: e.target.value })}
                        />
                    </p>
                </div>
            </div>
            <button className="btn btn-secondary" onClick={addNewParent}>Add Parent</button>
        </div>
    );
}

export default AddParent;
