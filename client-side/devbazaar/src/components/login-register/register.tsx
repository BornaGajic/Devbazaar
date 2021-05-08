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
        let role = store.userStore.user.role;
        
        let x = store.userStore.roleData.get(role) as Business;
        
        x.description = 'WOW';
    };

    function g ()
    {
        store.taskStore.createTask("Task" + (Math.random() * 100).toString())
    };

    return (
        <div className="d-flex justify-content-center">
            <button onClick={() => f()}>click za WOW</button>
            <div>
                { JSON.stringify(store.userStore.roleData) }
            </div>
            <br/>
            <div>
                { JSON.stringify(store.userStore.user.asJson) }
            </div>
            <br/>
            <div>
                { JSON.stringify(store.businessStore.businessCardList) }
            </div>
            <br/>
            <button onClick={() => g()}>
                Add task
            </button>
            <div>
                { JSON.stringify(store.taskStore.taskList) }
            </div>
        </div>
    );
})

export default Register;