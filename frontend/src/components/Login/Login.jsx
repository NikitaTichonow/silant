import React, { useState } from "react";
import { useAuth } from '../AuthContext/AuthContext';


function Login() {
  const { user, login, loading, errorMessage } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  }; 

    // Если пользователь уже авторизован, не показываем панель входа
    if (user) {
      return null; // Или можно вернуть какой-то другой компонент, например, приветствие
    }

    return (
      <div className="card blue lighten-5" style={{ borderRadius: '10px', width: '400px', padding: '15px'}}>
        <h5 className="center-align">Вход</h5>
        <form onSubmit={handleLogin}>
          <div className="input-field">
            <input
              id="username"
              type="text"
              className="blue-text text-darken-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username" style={{color: 'black'}}>Имя пользователя</label>
          </div>
          <div className="input-field">
            <input
              id="password"
              type="password"
              className="blue-text text-darken-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" style={{color: 'black'}}>Пароль</label>
          </div>
          <div className="center-align">
            <button className="btn waves-effect waves-light" type="submit" disabled={loading}>
              Войти
            </button>
          </div>
          {errorMessage && <div className="red-text center-align">{errorMessage}</div>}
        </form>
      </div>
    );
}

export { Login };