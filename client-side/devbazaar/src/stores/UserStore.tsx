import jwtDecode from 'jwt-decode';
import { makeAutoObservable} from 'mobx';
import { hydrateStore, makePersistable, StorageAdapter } from 'mobx-persist-store';

import { RootStore } from "../stores";

import { UserServiceInstance } from '../services';

import { Business, User } from '../models';
import { IUser } from '../models/contracts';
import { objectPrototype, stringifyKey, toJS } from 'mobx/dist/internal';

const modelMap = new Map<string, Object>([[User.className, new User()], [Business.className , new Business()]]);

export class UserStore
{
    RootStore: RootStore;
    User: User = new User();

    constructor (rootStore: RootStore)
    {
        makeAutoObservable(this, { RootStore: false });
        this.RootStore = rootStore;

        makePersistable(this, {
            name: "UserStore",
            properties: ["User"],
            storage: {
              setItem: (name: string, content: Object) => {
                  
                return new Promise((resolve) => {
                  let selfIterator = (map: Map<string, Object>): Record<string, Object> => 
                  {
                    return Array.from(map).reduce<Record<string, Object>>(
                      (acc, [key, value]) => 
                      {
                          if (value instanceof Map) 
                          {
                            acc[key] = selfIterator(value);
                          }
                          else
                          {
                            acc[key] = value;
                          }

                          return acc;
                      }, {} );
                  };
      
                  let objectifyMap = (myMap: Map<string, Object>): Record<string, Object> => {
                    return selfIterator(myMap);
                  };
      
                  let replacer = (i_name: string, val: Object) => 
                  {
                      if (val && val.constructor === Map)
                      {
                        return objectifyMap(val);
                      }
                      else
                      {
                          return val
                      }
                  };
      
                  let result = JSON.stringify(content, replacer);
      
                  localStorage.setItem(name, result);
      
                  resolve();
                });
              },
              removeItem: window.localStorage.removeItem,
              getItem: (key: string) => {

                let item = window.localStorage.getItem(key);
                
                let reviver = (i_name: string, value: any) =>
                {
                    if (i_name.length == 0) return value;

                    if (value && typeof value === 'object' && !Array.isArray(value))
                    {
                        for (let entry of modelMap.entries())
                        {
                            if (i_name === entry[0])
                            {
                                return Object.assign(entry[1], value);
                            }
                        }

                        return new Map(Object.entries(value));
                    }
                    
                    return value;
                }

                return JSON.parse(item as string, reviver);
              }
            },
            stringify: false
          });
    }

    /**
     * Logs in the user and updates its fields
     */
    async loginAsync (username: string, password: string): Promise<void>
    {
        let token: string;
        try
        {
            token = await UserServiceInstance.loginAsync(username, password);
        }
        catch (error)
        {
            console.log(error);return
        }

        let payload: jwtPayload = jwtDecode(token);
        localStorage.setItem('token', token);
        
        this.User.Id = payload['Id'];
        this.User.update({
            Username: payload['Username'],
            Email: payload['Email'],
            Role: payload['Role'],
            Logo: payload['Logo']
        } as IUser);

        this.User.fetchRoleData();
    }

    /**
     * Registers the user and updates its fields, then pushes the field values to the database.
     */
    async registerAsync (data: IUser): Promise<void>
    {
        let token: string;
        try
        {
            token = await UserServiceInstance.registerAsync(data);
        }
        catch (error)
        {
            console.log(error);return
        }

        let payload: jwtPayload = jwtDecode(token);
        localStorage.setItem('token', token);

        this.User.Id = payload['Id'];
        this.User.update({
            Username: payload['Username'],
            Email: payload['Email'],
            Role: payload['Role'],
            Logo: payload['Logo']
        } as IUser);
        // fetch role actions?
    }
}

interface jwtPayload
{
    Id: string;
    Username: string;
    Email: string;
    Role: string;
    Logo: string;
}