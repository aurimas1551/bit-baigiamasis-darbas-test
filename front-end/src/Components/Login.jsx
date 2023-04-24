import { useContext, useState } from "react";
import axios from 'axios';
import { Global } from "./Global";

function Login() {

    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const { setLogged, setAuthName, setRoute } = useContext(Global);

    const login = _ => {
        axios.post('http://localhost:3003/login', { name, password }, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                if (res.data.status === 'ok') {
                    setLogged(true);
                    setRoute('admin');
                    setAuthName(res.data.name);
                    setName('');
                    setPassword('');
                    setError(null);
                } else {
                    setError(true);
                }
            });
    }


    return (
        <div className="login">
            <div className="login-form">
                {
                    error ? <h2>Login error</h2> : <h2>Login</h2>
                }
                <div className="login-input">
                    <div className="username">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="password">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button className="creation-button" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;