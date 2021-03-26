import { observer } from 'mobx-react';
import { stringifyKey } from 'mobx/dist/internal';
import React, { ChangeEvent } from 'react';
import { Register } from '.';
import { useStores } from '../../hooks/useStores';
import { IUserData } from '../../stores/contracts';

import './login.css';

interface ILoginProps
{
    naslov : string
}

const Login = observer(({naslov} : ILoginProps) =>
{
    const store = useStores();

    let email: string = '';
    let username: string = '';
    let password: string = '';

    return (
        <div>
        <form onSubmit={ (e) => { store.UserStore.loginAsync(email, password); e.preventDefault(); } }>

            <label htmlFor="emailBox">Email:</label><br/>
            <input type="text" id="emailBox" onChange={ (e) => email =  e.target.value } /><br/><br/>

            <label htmlFor="passwordBox">Password:</label><br/>
            <input type="text" id="passwordBox" onChange={ (e) => password = e.target.value } /><br/><br/>

            <input type="submit" value="Submit" />
        </form> 
        <form onSubmit={ (e) => { store.UserStore.updateAsync({Username: username} as IUserData); e.preventDefault(); } }>

            <label htmlFor="usernameBox">Email:</label><br/>
            <input type="text" id="usernameBox" onChange={ (e) => username =  e.target.value } /><br/><br/>

            <input type="submit" value="Submit" />
        </form> 
        <Register naslov="" />
        </div>
    
    );
})

export default Login;