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
        let role = store.UserStore.User.Role;
        
        let x = store.UserStore.User.RoleData.get(role) as Business;
        
        x.Description = 'WOW';
    };

    console.log(store.UserStore.User.RoleData.entries);
    
    return (
        <div className="d-flex justify-content-center">
            <button onClick={() => f()}>click za WOW</button>
            <div>
                
            </div>
            <br/>
            <div>
                { JSON.stringify(store.UserStore.User) }
            </div>
            <br/>
            <div>
                { JSON.stringify(store.BusinessStore.businessList) }
            </div>
        </div>
    );
})

export default Register;