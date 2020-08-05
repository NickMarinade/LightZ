import React, { useState} from "react";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import {Button} from 'react-bootstrap'
import {useParams} from 'react-router-dom'



export default function NewPassword() {
    
    
    const [newPassword, setNewPassword] = useState();
    // eslint-disable-next-line
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();
  
  
    
   
  const {token} = useParams()
   

  const submit = async (event) => {
    event.preventDefault();

    try {
    const loadPass = {newPassword}
    Axios.put(`http://localhost:8080/api/reset-password/&:token=${token} `,loadPass )
    .then(response => response.json())
    .then(data => (data))
   } catch (err) {
    err.response.data.msg && setError(err.response.data.msg);
   
  }
}


    return (
 <div className="page">
    
      <form className="form" onSubmit={submit}>
      {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
        <label htmlFor="reset-email">Enter your new password</label>
        <input
          id="reset-email"
          type="password"
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