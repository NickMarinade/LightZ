import React, { useContext } from "react";
import HaveElectricity from "../reports/HaveEl";
import NoElectricity from "../reports/NoEl";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'
import Report from '../modal/Report'
import UserContext from "../../context/UserContext";
import {Link} from 'react-router-dom'

export default function Home() {
 
  const { userData } = useContext(UserContext);
  return (
    <div className="page">
          {userData.user ? (
          <div className="justify-content-center">
          <h2>Welcom {userData.user.userName}</h2>
            <Report/>
            <Container>
        <Row xs={1} md={2}>
        <Col><HaveElectricity/></Col>
        <Col><NoElectricity/></Col>
       </Row>
       </Container>
       </div>
            
            ) : (
        <div>
        <h6 className="justify-content-center">Please <span><Link to="/login">Log in</Link></span>  or <span><Link to="/register">Register</Link></span> to make a report</h6>
            <Container>
        <Row xs={1} md={2}>
        <Col><HaveElectricity/></Col>
        <Col><NoElectricity/></Col>
       </Row>
       </Container>
       </div>  
          )
    }
    
      </div>
      );
}
    

