import { observer } from 'mobx-react';
import { observable, stringifyKey } from 'mobx/dist/internal';
import React, { ChangeEvent } from 'react';
import { Register } from '.';
import { IBusinessPage } from '../../common';
import { useStores } from '../../hooks/useStores';
import { IBusiness, IUser } from '../../models/contracts';

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
    let description: string = '';

    return (
        <div className="container">

        <form onSubmit={ (e) => { store.authStore.loginAsync(email, password); e.preventDefault(); } }>

            <label htmlFor="emailBox">Email:</label><br/>
            <input type="text" id="emailBox" onChange={ (e) => email =  e.target.value } /><br/><br/>

            <label htmlFor="passwordBox">Password:</label><br/>
            <input type="text" id="passwordBox" onChange={ (e) => password = e.target.value } /><br/><br/>

            <input type="submit" value="Login" />
        </form> 

        <form onSubmit={ (e) => { store.userStore.user.update({username: username} as IUser); e.preventDefault(); } }>

            <label htmlFor="usernameBox">change Username:</label><br/>
            <input type="text" id="usernameBox" onChange={ (e) => username =  e.target.value } /><br/><br/>

            <input type="submit" value="Change username" />
        </form> 

        <div>
            { JSON.stringify(store.userStore.user.asJson) }
        </div> 
        
        <button onClick={ () => store.businessStore.fetchBusinesses({ PageNumber: 1 } as IBusinessPage) }> fetch page </button>
        <form onSubmit={ (e) => { store.userStore.roleData.get(store.userStore.user.role)?.update({ description: description } as IBusiness); e.preventDefault(); } }>

            <label htmlFor="usernameBox">change Description:</label><br/>
            <input type="text" id="usernameBox" onChange={ (e) => description = e.target.value } /><br/>

            <input type="submit" value="Change description" /><br/><br/>
        </form> 
        <Register naslov="" />
        </div>
    
    );
})

export default Login;