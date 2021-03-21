import { observer } from 'mobx-react';
import { stringifyKey } from 'mobx/dist/internal';
import React, { ChangeEvent } from 'react';
import { Register } from '.';
import { useStores } from '../../hooks/useStores';

import './login.css';

interface ILoginProps
{
    naslov : string
}

const Login = observer(({naslov} : ILoginProps) =>
{
    const store = useStores();
    // store.UserStore.Login(store.UserStore.Email, store.UserStore.Password)

    function updateProperty (e : ChangeEvent<HTMLInputElement>)
    {
        // koristiti action od userstorea
        store.UserStore.Email = e.target.value;
        
    }

    return (
        <div>
        <form onSubmit={ (e) => { console.log(store.UserStore.Email); e.preventDefault(); } }>

            <label htmlFor="lname">Last name:</label><br/>
            <input type="text" id="lname" onChange={ (e) => updateProperty(e) } /><br/><br/>

            <input type="submit" value="Submit" />
        </form> 
        <Register naslov="" />
        </div>
    
    );
})

export default Login;