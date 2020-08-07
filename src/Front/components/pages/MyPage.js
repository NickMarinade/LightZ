import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Report from "../modal/Report";


export default function MyPage() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <div className="justify-content-center">
        <h2> Welcome {userData.user.userName}</h2>
        <Report/>
        </div>
        
      ) : (
        <div className="justify-content-center">
        <h2>You are not logged in</h2>
        <Link to="/login">Log in</Link>
        <p className="m-4 p-2"></p>
        </div>
      )
}

    </div>
  );
}