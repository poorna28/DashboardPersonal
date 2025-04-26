import React, { useEffect, useState } from "react";
import axios from "axios";


const initialUser = {
    name:" ",
    email:" ",
    phone:" "
}

function AddUser(props){
    const [userInfo, setUserInfo] = useState(initialUser);


        const AddNewUser = async()=>{
            try{
                const response = await axios.post('http://localhost:3034/users' , userInfo);
                if(response){
                    props.setUserAdded();
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
            <button className="btn btn-secondary" onClick={() =>AddNewUser()} >Add User</button>
        </div>

    );
}

export default AddUser;