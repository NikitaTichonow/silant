import { useAuth } from "../AuthContext/AuthContext";
import { Link } from "react-router-dom";

function Header() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

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
            </ul>
          )}
        </ul>
      </div>
    </nav>
  );
}

export { Header };
