import React, { useState, useContext} from "react";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import {Button} from 'react-bootstrap'
import { useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";





export default function NewPassword() {
    
    
    const [newPassword, setNewPassword] = useState();
    // eslint-disable-next-line
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();
    
    
    const token = window.location.href.split('/').reverse()[0]
   
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();

    try {
    const newPswd = {newPassword}
    Axios.put(`http://localhost:8080/api/reset-password/${token}` , newPswd )
    .then(res => {
      setUserData({newPassword: res.newPassword});
    })
    history.push("/login");
   } catch (err) {
    err.response.data.msg && setError(err.response.data.msg);
   
  }
}


    return (
 <div className="page">
    
      <form className="form" onSubmit={submit}>
      {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
        <label htmlFor="new-password">Enter your new password</label>
        <input
          id="new-password"
          type="password"
          autoComplete="false"
          onChange={(e) => setNewPassword(e.target.value)}
        />
       <input
          type="password"
          placeholder="Confirm password"
          autoComplete="false"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
       
        <Button className="log btn btn-primary" type="submit">Confirm</Button>
      </form>
      
   </div>
    );
  }