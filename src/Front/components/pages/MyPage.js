import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function MyPage() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <h1>Welcome {userData.user.userName}</h1>
      ) : (
        <>
         <h2>Your report history</h2>
         <h1>Make report</h1>
         <button>Report</button>
         
        </>
      )}
    </div>
  );
}
