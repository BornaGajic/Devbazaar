import { observer } from "mobx-react";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import { AuthStore } from "../../stores/auth-stores";
import { UserStore } from "../../stores/user-stores/UserStore";

import './Login.css';

const Login = observer(({ authStore, userStore } : { authStore: AuthStore, userStore: UserStore }) => {

    let history = useHistory();
    let [password, setPassword] = useState('');
    let [isLoading, setIsLoading] = useState(false);

    let handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        userStore.user.data = { email: e.target.value };
    }

    let handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value); 
    }

    function handleLogin (e: React.SyntheticEvent)
    {
        e.preventDefault();
        
        setIsLoading(true);

        authStore.loginAsync(userStore.user.email!, password).then(() =>{
            setIsLoading(false);
            history.push('/')
        });
    }

    return (
        <div className="text-center container d-flex justify-content-center" style={{marginTop: "10%"}}>
            <div className="d-flex justify-content-center bg-light w-50 shadow rounded">
                <form className="w-50" onSubmit={(e) => handleLogin(e)}>
                    <i className="bi bi-code-slash fs-1"></i>
                    <h1 className="h3 mb-3 fw-normal">Welcome to Devbazaar</h1>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control shadow-none" id="floatingInput" placeholder="name@example.com" required onChange={(e) => handleEmailChange(e)} />
                        <label htmlFor="floatingInput" className="text-muted">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control shadow-none mb-3" id="floatingPassword" placeholder="Password" required onChange={(e) => handlePasswordChange(e)} />
                        <label htmlFor="floatingPassword" className="text-muted">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
                        {
                            isLoading ? 
                            <div className="spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            :
                            <span>Sign in</span>
                        }
                    </button>
                    <p className="mt-5 mb-3 text-muted pb-3">Don't have an account? <a className="link" href="#">Register</a></p>
                </form>
            </div>
	    </div>
    );
});

export default Login;