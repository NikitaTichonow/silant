import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Login } from "../Login/Login";

function Header() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('Текущий пользователь:', user);

  const handleOpenModal = () => {
    console.log("Открытие модального окна");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Закрытие модального окна");
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    console.log("Выход из аккаунта");
    logout();
  };

  return (
    <nav className="#163E6C blue darken-3">
      <div className="nav-wrapper">
        <Link to="/technical-data" className="brand-logo">
          <span className="full-title">Сервисная книга для складской техники «Силант»</span>
          <span className="short-title">Силант</span>
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {user ? (
            <li>
              <h5 className="left center nameuser">Добро пожаловать, {user.username}</h5>
              <button onClick={handleLogout} className="btn" aria-label="Выйти из аккаунта">
                Выйти
              </button>
            </li>
          ) : (
            <>
              <li>
                <span>+7-910-22-12-09, Telegram</span>
              </li>
              <li>
                <button className="btn #D20A11" onClick={handleOpenModal}>
                  Авторизация
                </button>
                {isModalOpen && (
                  <>
                    <div className="modal-overlay" onClick={handleCloseModal}></div>
                    <Login onClose={handleCloseModal} />
                  </>
                )}
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Кнопки внизу для мобильного отображения */}
      <div className="mobile-buttons hide-on-large-only">
        <ul>
          {user ? (
            <li>
              <h5 className="left center nameuser">Добро пожаловать, {user.username}</h5>
              <button onClick={handleLogout} className="btn " aria-label="Выйти из аккаунта">
                Выйти
              </button>
            </li>
          ) : (
            <li >
              <button className="btn #D20A11"  onClick={handleOpenModal}>
              Авторизация
              </button>
              {isModalOpen && (
                <>
                  <div className="modal-overlay" onClick={handleCloseModal}></div>
                  <Login onClose={handleCloseModal} />
                </>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );  
}

export { Header };
