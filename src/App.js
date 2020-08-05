import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap';
import Axios from "axios";
import Header from "./Front/components/layout/Header";
import Home from "./Front/components/pages/Home";
import Login from "./Front/components/auth/Login";
import Register from "./Front/components/auth/Register";
import UserContext from "./Front/context/UserContext";
import GitHubIcon from '@material-ui/icons/GitHub';
import "./style.css";
import MyPage from "./Front/components/pages/MyPage";
import About from "./Front/components/pages/About";
import Tips from "./Front/components/pages/Tips";
import ForgotPassword from './Front/components/password/ForgotPassword'
import NewPassword from './Front/components/password/NewPassword'

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:8080/api/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:8080/api/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/my-page" component={MyPage} />
              <Route path="/about" component={About} />
              <Route path="/tips" component={Tips} />
              <Route path="/forgot-password" component={ForgotPassword}/>
              <Route path="/reset-password/:token"  component={NewPassword}/>
            </Switch>
          <Navbar id="responsive-navbar-nav" className="justify-content-center text-center fixed-bottom"  color="dark" expand="lg" bg="dark" variant="dark">
        {/* <nav className="text-muted">Non profit app </nav> */}
        <Nav.Link className="text-white" href="https://github.com/KLisabeth/-Do-you-have-electricity-"><GitHubIcon/>  GitHub</Nav.Link>
          @Copyright by LightZ
          </Navbar>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
