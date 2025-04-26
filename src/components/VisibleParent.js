import React, { useEffect, useState } from "react";
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

function VisibleParent(props) {
    const [parentInfo, setParentInfo] = useState(initialParent);

    useEffect(() => {
        fetchParent();
    }, []);

    const fetchParent = async () => {
        try {
            const response = await axios.get('http://localhost:3035/parents/' + props.parentId);
            if (response) {
                setParentInfo(response.data);
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
                        <span>{parentInfo.name}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Email:</span>
                        <span>{parentInfo.email}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Phone Number:</span>
                        <span>{parentInfo.phone}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Occupation:</span>
                        <span>{parentInfo.occupation}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Emergency Contact Name:</span>
                        <span>{parentInfo.emergencyContactName}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Emergency Contact Relationship:</span>
                        <span>{parentInfo.emergencyContactRelationship}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Emergency Contact Phone:</span>
                        <span>{parentInfo.emergencyContactPhone}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VisibleParent;
