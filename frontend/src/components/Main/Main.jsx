import React from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { Login } from "../Login/Login";
import { TechnicalDataSearch } from "../TechnicalDataSearch/TechnicalDataSearch";
import logo from '../../assets/images/logo1.jpg'
import logo2 from '../../assets/images/logo2.jpg'
import logo3 from '../../assets/images/logo3.jpg'

function Main() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated() ? (
        <>
          <h4 className="container content center">
            
          </h4>
        </>
      ) : (
        <div className="container content">
          <p className="center">
            <img src={logo3} alt="logo" className="logo "/>
            <img src={logo} alt="logo" className="logo "/>
            <img src={logo2} alt="logo" className="logo"/>
            <Login />
          </p>
          <p className="center">
            <TechnicalDataSearch />
          </p>
        </div>
      )}
    </div>
  );
}

export { Main };
