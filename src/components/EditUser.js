import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";


const initialUser = {
    id:"",
    name:" ",
    email:" ",
    phone:" "
}

function EditUser(props){
    const [userInfo, setUserInfo] = useState(initialUser);

        useEffect(()=>{
            fetchUser();
        },[]);

        
        const fetchUser = async()=>{
        //     try{
        //         const response = await axios.get('http://localhost:3034/users/' + props.userId);
        //         if(response){
        //             setUserInfo(response.data);
        //         }
        // }
        try {
            const response = await api.getUser(props.userId);
            if (response) {
              setUserInfo(response.data);
            }
        }
        catch(e){
            console.log(e);
        }
        }

        const EditOldUser = async()=>{
            try{
                // const response = await axios.put('http://localhost:3034/users/' +props.userId, userInfo);
                const response = await api.updateUser(props.userId, userInfo);
                if(response){
                    props.setUserEdited();
         }
        }
        catch(e){
            console.log(e);
        }
        }


    return(
        <div className="main-view-addbtn">

            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Name:</span>
                        <input type="text" value={userInfo.name} className="form-group" placeholder="Enter your name" onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Email:</span>
                        <input type="email" value={userInfo.email} className="form-group" placeholder="Enter your email" onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />

                    </p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <p>
                        <span>Phone Number:</span>
                        <input type="number" value={userInfo.phone} className="form-group" placeholder="Enter your number" onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
                    </p>
                </div>
            </div>
            <button className="btn btn-secondary" onClick={() =>EditOldUser()} >Update User</button>
        </div>

    );
}

export default EditUser;