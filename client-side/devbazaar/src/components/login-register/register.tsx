import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
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

    function f (): void
    {
        console.log(store.userStore.roleData);

        let role = store.userStore.user.role;
        
        let x = store.userStore.roleData.get(role) as Business;
        
        x.description = 'WOW';
    };

    function g ()
    {
        store.taskStore.createTask("Task" + (Math.random() * 100).toString())
    };

    return (
        <div className="w-25 col">
            
            <div className="row">
                <button onClick={() => f()}>click za WOW</button>
                { JSON.stringify(store.userStore.roleData.get(store.userStore.user.role)?.asJson) }<br/>
                { JSON.stringify(store.userStore.user.asJson) }<br/>
                { JSON.stringify(store.businessStore.businessCardList) }<br/>
            </div>
            
            <div className="row">
                <button onClick={() => g()}>
                    Add task
                </button>
                { JSON.stringify(store.taskStore.taskList) }
            </div>

            <div className="row">
                <button onClick={() => store.authStore.logoutAsync()}>
                    Logout
                </button>
            </div>
        </div>
    );
})

export default Register;