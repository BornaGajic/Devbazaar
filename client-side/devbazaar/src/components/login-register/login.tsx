import { observer } from 'mobx-react';
import { observable, stringifyKey } from 'mobx/dist/internal';
import React, { ChangeEvent } from 'react';
import { Register } from '.';
import { IBusinessPage } from '../../common';
import { useStores } from '../../hooks/useStores';
import { IUser } from '../../stores/contracts';


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
        <form onSubmit={ (e) => { store.UserStore.User.update({Username: username} as IUser); e.preventDefault(); } }>

            <label htmlFor="usernameBox">Email:</label><br/>
            <input type="text" id="usernameBox" onChange={ (e) => username =  e.target.value } /><br/><br/>

            <input type="submit" value="Submit" />
        </form> 
        <button onClick={ () => store.UserStore.User.fetchRoleData() }> Fetch Role Data </button>
        <p>
            { JSON.stringify(store.UserStore.User.RoleData) }
        </p> 
        <button onClick={ () => store.BusinessStore.fetchPage({ PageNumber: 1 } as IBusinessPage) }> fetch page </button>
        <Register naslov="" />
        </div>
    
    );
})

export default Login;