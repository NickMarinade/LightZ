import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';




export default function About() {
return (
  <div className="page">
<article className="About card">       
  <p className="lead ml-3 p-1">
    This project was built to be used by Venezuelans in times of
    crisis. In the year 2019 Venezuela suffered a series of blackouts
    nationwide, the first lasted from 5 to 7 continuous days (in some
    states), the water supply was also affected because the dams did
    not have energy to pump the water. Telecommunications, hospitals,
    commerce, etc. were also affected.
  </p>
  <hr className="ml-3 p-1"/>
  <p className="lead m-3">
    The purpose of this app is for users to easily see the list of
    reports of places where there is electricity and where there is
    not, and so they can appreciate if the power outage they are
    their own report too.
  </p>
  <hr className="ml-4 p-2"/>
  <p className="lead m-3">
    Receiving information on time can be extremely useful, it can help
    people to be better prepared to endure long days without
    electricity, collecting water before dams stop working, for
    example
  </p>
</article> 
</div>
);
}
