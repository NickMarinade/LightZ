import React , {useState}from 'react';
import {Alert} from 'react-bootstrap'
import { Link } from "react-router-dom";

function Message() {
     // eslint-disable-next-line
    const [show, setShow] = useState(true);

    return (
      <div className="page text-center">
        <Alert show={show} variant="success">
          <Alert.Heading className="d-flex justify-content-center">SUCCESS!</Alert.Heading>
          <h2> Email has been sent!</h2>
          <h3>
           Please check your email for further instructions
          </h3>
          <p>If you don't receive an email. Please try again in 10 min</p>
          <hr />
          <div className="d-flex justify-content-end">
          <Link className="btn btn-outline-success"  to="/">Close</Link>
          </div>
        </Alert>

      </div>
    );
  }


export default Message;
