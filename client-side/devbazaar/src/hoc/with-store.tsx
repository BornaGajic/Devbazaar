import React, { ComponentType } from 'react';

import hoistNonReactStatics from "hoist-non-react-statics"; // simmilar to Object.assign

import { useStores } from '../hooks/useStores'
import { wrap } from 'node:module';

/**
 * Creates a return type for higher order component. 
 * It's a function that takes component, returns a function that takes properties of given component that returs JSX element.
 */
export type TWithStoreHoc = <P extends unknown> (Component: ComponentType<P>) => (props: P) => JSX.Element;

/**
 * Higher order component which wrappes class component with root store
 */
export const withStore: TWithStoreHoc = (WrappedComponent) => (props) =>
{
    const ComponentWithStore = () =>
    {
        const store = useStores();

        return <WrappedComponent { ...props } store = { store } />;
    }

    ComponentWithStore.defaultProps =  { ...WrappedComponent.defaultProps }
    ComponentWithStore.displayName = `WithStores(${ WrappedComponent.name || WrappedComponent.displayName })`;

    hoistNonReactStatics(ComponentWithStore, WrappedComponent);

    return <ComponentWithStore />
}