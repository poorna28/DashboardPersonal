import React, { useEffect, useState } from "react";
import axios from "axios";


const initialUser = {
    name:" ",
    email:" ",
    phone:" "
}

function VisibleUser(props){
    const [userInfo, setUserInfo] = useState(initialUser);

        useEffect(()=>{
            fetchUser();
        },[]);

        const fetchUser = async()=>{
            try{
                const response = await axios.get('http://localhost:3034/users/' + props.userId);
                if(response){
                    setUserInfo(response.data);
                }
        }
        catch(e){
            console.log(e);
        }
        }

    return(
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
                        <span>{userInfo.phone}</span>
                    </p>
                </div>
            </div>
        </div>

    );
}

export default VisibleUser;