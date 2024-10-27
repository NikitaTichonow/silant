import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Login } from "../Login/Login";

function Header() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('Текущий пользователь:', user);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="blue darken-3">
      <div className="nav-wrapper">
        <Link to="/technical-data" className="brand-logo">
          Сервисная книга для складской техники «Силант»
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {user ? (
            <li>
              <h5 className="left center">
                Добро пожаловать, {user.username}
              </h5>
              <button
                onClick={logout}
                className="btn"
                aria-label="Выйти из аккаунта"
              >
                Выйти
              </button>
            </li>
          ) : (
            <>
              <li>
                <a href="/">+7-910-22-12-09, Telegram</a>
              </li>
              <li>
                <button className="btn" onClick={handleOpenModal}>
                  Авторизация
                </button>
                {isModalOpen && (
                  <>
                    <div
                      className="modal-overlay"
                      onClick={handleCloseModal}
                    ></div>
                    <Login onClose={handleCloseModal} />
                  </>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export { Header };
