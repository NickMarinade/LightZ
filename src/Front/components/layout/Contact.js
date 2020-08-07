import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Media} from 'react-bootstrap';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import l from './l.png';
import z from './z.png';



export default function Contact() {

  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  // eslint-disable-next-line
  const [error, setError] = useState();
  


  
  const submit = async () => {
   
    try {
      const msg = {email, message};
      await Axios.post(
        "http://localhost:8080/api/message",
        msg
      );
     } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
return (
  <div className="page">
<div className="bg-dark card border-info text-white text-center"  >
  <div className="card-header" >CONTACT US</div>
  <div>
    <div className="lead card-title m-3" >We'd <FavoriteBorderIcon/> to help</div>
    <div className="card-text">
    <div className="card-group">
    <div className="bg-dark card border-secondary text-white text-left" style={{ maxwidth: '150px', borderRadius:'1rem', margin:'2rem', padding: '1rem' }} >
    <div className="card-body">
    <div><LocationOnIcon className="card-title m-3"/> Brussel, Belgium</div>
    <div><EmailIcon  className="card-title m-3"/> hyf.team.lightz@gmail.com </div>
    <Media className="justify-content-center m-3">
    <img className="contactL"src={l} alt="logo" />
    <img className="contactZ"src={z} alt="logo" />
    </Media>
   </div>
  </div>
  <div className="bg-dark card text-white ">
  
  <form className="form" onSubmit={submit}>
  <div className="form-inline">
  <label htmlFor="user-email">Email</label>
  <input
    id="user-email"
    type="text"
    onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className="form-inline">
  <label htmlFor="meggage-area">Message</label>
  <textarea className="msg-area" id="meggage-area" rows="3" onChange={(e) => setMessage(e.target.value)}></textarea> 
  </div>
  <hr/>
  <Button className='msg-btn' variant="secondary" type="submit">Submit</Button>
   </form>
 
  </div>
  </div>
   </div >
   </div>
  <div className="text-muted card-footer">This is non profit App</div>
</div>
<p className="m-4 p-2"></p>
</div>
);
}
