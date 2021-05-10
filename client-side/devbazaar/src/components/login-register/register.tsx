import React from 'react';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import { useStores } from '../../hooks/useStores';
import { Business } from '../../models';

import './login.css';

interface IRegisterProps
{
    naslov : string
}

const Register = observer(({naslov} : IRegisterProps) =>
{
    const store = useStores();

    let role = store.userStore.user.role;
    let x = store.userStore.roleData.get(role) as Business;

    function f (): void
    {
        runInAction(() => { x.description = 'WOW' }) 
    };

    return (
        <div className="w-25 col">
            
            <div className="row">
                <button onClick={() => f()}>click za WOW</button>
                { JSON.stringify(store.userStore.roleData.get(store.userStore.user.role)?.asJson) }<br/>
                { JSON.stringify(store.userStore.user.asJson) }<br/>               
            </div>
            
            <div className="row">
                <button onClick={() => x.fetchPinnedTasks()}> fetch pinned tasks </button>
                { JSON.stringify(x ? x.pinnedTasks : null) }
            </div>

            <div className="row">
                <button onClick={() => store.authStore.logoutAsync()}>
                    Logout
                </button>
            </div>

            <div>
                { JSON.stringify(store.userStore.user.asJson) }
            </div>
        </div>
    );
})

export default Register;