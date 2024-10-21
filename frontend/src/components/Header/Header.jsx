import React, { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { Login } from "../Login/Login";

function Header() {
  const { user, loading, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="blue darken-3">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          Сервисная книга для складской техники «Силант»
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {loading ? (
            <li>
              <span>Загрузка...</span>
            </li>
          ) : user ? (
            <li>
              <span>Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="btn"
                aria-label="Выйти из аккаунта"
              >
                Выйти
              </button>
            </li>
          ) : (
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <a href="/">+ 7-910-22-12-09, telegram</a>
              </li>
              <li>
                <button className="btn" onClick={handleOpenModal}>Авторизация</button>
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
            </ul>
          )}
        </ul>
      </div>
    </nav>
  );
}

export { Header };
