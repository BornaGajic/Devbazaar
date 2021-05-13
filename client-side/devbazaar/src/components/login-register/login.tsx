import { observer } from 'mobx-react';
import { action, runInAction } from 'mobx'
import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { Register } from '.';
import { IBusinessPage, IPage, ITaskPage } from '../../common';
import { useStores } from '../../hooks/useStores';

import './login.css';
import { ITask } from '../../models/contracts';
import { Task } from '../../models/Task';
import { TaskCrud } from '../../models/crud';

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
    let highPrice: number = Number.MAX_SAFE_INTEGER; 
    let lowPrice: number = Number.MIN_SAFE_INTEGER;
    
    const blist = store.businessPageStore.businessCards?.map((business) =>
        <ul key={ business.id }>
            <li>{ business.id }</li>
            <li>{ business.description }</li>
            <li>{ business.about }</li>
            <li>{ business.available }</li>
            <li>{ JSON.stringify(business.categories) }</li>
            <li>{ business.city }</li>
            <li>{ business.country }</li>
            <li>{ business.website }</li>
            <li>{ business.postalCode }</li>
            <li>--------------------------</li>
        </ul>
    );

    return (
        <div className="container">

            <form onSubmit={ (e) => { store.authStore.loginAsync(email, password); e.preventDefault(); } }>

                <label htmlFor="emailBox">Email:</label><br/>
                <input type="text" id="emailBox" onChange={ (e) => email =  e.target.value } /><br/><br/>

                <label htmlFor="passwordBox">Password:</label><br/>
                <input type="text" id="passwordBox" onChange={ (e) => password = e.target.value } /><br/><br/>

                <input type="submit" value="Login" />
            </form> 


            <button onClick={ () => store.taskPageStore.fetchTasksPage({ PageNumber: 1 } as ITaskPage) }> fetch page </button>

            <Register/>
        </div>
    );
})

export default Login;