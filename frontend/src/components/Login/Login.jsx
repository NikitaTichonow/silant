import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext';

function Login({ onClose }) {
    const { user, login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        const success = await login(username, password);
        setLoading(false);
        if (success) {
            onClose();
        } else {
            setErrorMessage("Ошибка входа. Пожалуйста, проверьте свои учетные данные.");
        }
    };

    if (user) {
        return null;
    }

    return (
        <div className="card blue lighten-3" style={{ borderRadius: '10px', width: '400px', padding: '15px'}}>
            <h5 className="center-align" style={{color: 'black'}}>Вход</h5>
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
                    <label htmlFor="username" style={{color: 'black', fontSize: '18px'}}>Имя пользователя</label>
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
                    <label htmlFor="password" style={{color: 'black', fontSize: '18px'}}>Пароль</label>
                </div>
                <div className="center-align">
                    <button className="btn waves-effect waves-light" type="submit" disabled={loading}>
                        Войти
                    </button>
                </div>
                {errorMessage && <div className="red-text center-align">{errorMessage}</div>}
            </form>
            <button onClick={onClose} className="btn red lighten-2">Закрыть</button>
        </div>
    );
}

export { Login };
