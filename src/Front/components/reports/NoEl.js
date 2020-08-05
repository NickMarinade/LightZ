import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';  
import ErrorNotice from "../misc/ErrorNotice";
import { Table } from "react-bootstrap";





export default function NoElectricity () {  
   const [reports, setReports] = useState([]);
   const [error, setError] = useState();

  
   useEffect(() => {
    Axios
     .get("http://localhost:8080/api/no")
     .then((res) => {
      JSON.stringify(setReports(res.data));
    })
    
  }, [])
 
 
 
  const renderHeader = () => {
    let headerElement = ['#','time','state', 'city', ]

    return headerElement.map((key, index) => {
        return <th scope="col" key={index}>{key.toUpperCase()}</th>
    })
}


const renderBody = () => {
  return reports.map((item, idx) => {
      return (
        <tr key={idx}>
          <td>{idx}</td>
          <td>{item.date}</td>
          <td>{item.stateName}</td>
          <td>{item.cityName}</td>
        </tr>
      )
  })
}
 
  
    return (
      
        <div>  
          <div>
            <h1 id='title'>Don't have electricity</h1>
            <Table responsive>
                <thead className="thead-dark">
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </Table>
        </div>
    {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} /> )}
        </div>  
    )  
}  