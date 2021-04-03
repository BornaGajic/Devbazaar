import { observer } from 'mobx-react';
import { observable, stringifyKey } from 'mobx/dist/internal';
import React, { ChangeEvent } from 'react';
import { Register } from '.';
import { IBusinessPage } from '../../common';
import { useStores } from '../../hooks/useStores';
import { IUser } from '../../stores/contracts';
import { IBusiness } from '../../stores/contracts/IBusiness';


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
        <div>
        <form onSubmit={ (e) => { store.UserStore.loginAsync(email, password); e.preventDefault(); } }>

            <label htmlFor="emailBox">Email:</label><br/>
            <input type="text" id="emailBox" onChange={ (e) => email =  e.target.value } /><br/><br/>

            <label htmlFor="passwordBox">Password:</label><br/>
            <input type="text" id="passwordBox" onChange={ (e) => password = e.target.value } /><br/><br/>

            <input type="submit" value="Submit" />
        </form> 
        <form onSubmit={ (e) => { store.UserStore.User.update({Username: username} as IUser); e.preventDefault(); } }>

            <label htmlFor="usernameBox">change Username:</label><br/>
            <input type="text" id="usernameBox" onChange={ (e) => username =  e.target.value } /><br/><br/>

            <input type="submit" value="Submit" />
        </form> 
        <button onClick={ async () => { console.count(); }  }> Fetch Role Data </button>
        <div>
            { JSON.stringify(store.UserStore.User.RoleActions.get(store.UserStore.User.Role)?.asJson ?? {BLABLA: "BLABAL"}) }
        </div> 
        <button onClick={ () => store.BusinessStore.fetchBusinesses({ PageNumber: 1 } as IBusinessPage) }> fetch page </button>
        <form onSubmit={ (e) => { store.UserStore.User.RoleActions.get(store.UserStore.User.Role)?.update({ Description: description } as IBusiness); e.preventDefault(); } }>

            <label htmlFor="usernameBox">change Description:</label><br/>
            <input type="text" id="usernameBox" onChange={ (e) => description =  e.target.value } /><br/><br/>

            <input type="submit" value="Submit" />
        </form> 
        <Register naslov="" />
        </div>
    
    );
})

export default Login;