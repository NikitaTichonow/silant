import React from "react";
import { useAuth } from "../../context/AuthContext";
import { TechnicalDataSearch } from "../TechnicalDataSearch/TechnicalDataSearch";
import logo4 from '../../assets/images/logo4-1.png'

function Main() {
  const { isAuthenticated } = useAuth();
  const { user } = useAuth();

  return (
    <div>
      {isAuthenticated() ? (
        <>
          <h4 className="container content center">
            Добро пожаловать, {user.username}
          </h4>
        </>
      ) : (
        <div className="container content">
          <p className="center">
            <img src={logo4} alt="logo" className="logo"/>
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
