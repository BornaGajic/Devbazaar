import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks/useStores';
import { Business } from '../../stores/BusinessStore';

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
        let role = store.UserStore.User.Role;
        let x = store.UserStore.User.RoleActions.get(role) as Business;
        
        x.Description = 'WOW';
    };
    
    return (
        <div className="d-flex justify-content-center">
            <button onClick={() => f()}>click za WOW</button>
            <div>
                { JSON.stringify(store.UserStore.User.RoleActions.get(store.UserStore.User.Role)) }
            </div>
            <br/>
            <div>
                { JSON.stringify(store.UserStore.User.asJson) }
            </div>
            <br/>
            <div>
                { JSON.stringify(store.BusinessStore.businessList) }
            </div>
        </div>
    );
})

export default Register;