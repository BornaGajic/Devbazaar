import { useContext } from 'react';
import { RootStore } from '../stores'
import { StoreContext } from '../contexts'

/**
 * Returns the current root store value
 */
export const useStores = () : RootStore => useContext(StoreContext)