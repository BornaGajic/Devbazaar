import React, { Component, ReactChildren } from "react";
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps
{
    children: React.ReactNode;
    exact: boolean;
    path: string;
}

export const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {

    return (
        <Route
            {...rest}
            render={
                ({ location }) => 
                    localStorage.getItem('token') 
                        ? children 
                        : 
                        <Redirect 
                            to={{
                                pathname: "/Login",
                                state: { from: location }
                            }}
                        />
            }
        />
    );
};