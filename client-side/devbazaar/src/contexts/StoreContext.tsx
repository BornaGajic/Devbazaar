import React, {createContext, ReactElement, ReactNode } from 'react';
import { RootStore } from '../stores'

export const StoreContext = createContext<RootStore>({} as RootStore);

let store: RootStore;

export function StoreProvider ({ children }: { children: ReactNode }) : ReactElement {
    
    const root = store ?? new RootStore();
  
    return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
} 