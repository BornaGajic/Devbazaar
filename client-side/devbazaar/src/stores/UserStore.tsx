import jwtDecode from 'jwt-decode';
import { makeAutoObservable} from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { RootStore } from "../stores";

import { Business, User } from '../models';
import { IUser } from '../models/contracts';
import { UserService } from '../services';
import { IUserService } from '../services/contracts/IUserService';

const modelMap = new Map<string, Object>([
    [User.className, new User()], 
    [Business.className , new Business()]
]);

export class UserStore
{
    rootStore: RootStore;
	userService: IUserService;
    user: User;

    constructor (rootStore: RootStore, userService: IUserService)
    {
		this.user = new User(this, userService);
		this.rootStore = rootStore;
		this.userService = userService;

      	makeAutoObservable(this, { rootStore: false, userService: false });

        makePersistable(this, {
            name: "UserStore",
            properties: ["user"],
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
                return new Promise((resolve) => {
                  let item = window.localStorage.getItem(key);
                
                  let reviver = (i_name: string, value: any) =>
                  {
                      if (i_name.length == 0) return value;
  
                      if (value && typeof value === 'object' && !Array.isArray(value))
                      {
                          for (let entry of modelMap.entries())
                          {
                              if (i_name.toLowerCase() === entry[0].toLowerCase())
                              {
                                  return Object.assign(entry[1], value);
                              }
                          }
  
                          return new Map(Object.entries(value));
                      }
                      
                      return value;
                  }
  
                  resolve(JSON.parse(item as string, reviver));
                });
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
            token = await this.userService.loginAsync(username, password);
        }
        catch (error)
        {
            console.log(error);return
        }

        let payload: jwtPayload = jwtDecode(token);
        localStorage.setItem('token', token);
        
        this.user.id = payload['Id'];
        this.user.update({
            username: payload['Username'],
            email: payload['Email'],
            role: payload['Role'],
            logo: payload['Logo']
        } as IUser);

        this.user.fetchRoleData();
    }

    /**
     * Registers the user and updates its fields, then pushes the field values to the database.
     */
    async registerAsync (data: IUser): Promise<void>
    {
        let token: string;
        try
        {
            token = await this.userService.registerAsync(data);
        }
        catch (error)
        {
            console.log(error);return
        }

        let payload: jwtPayload = jwtDecode(token);
        localStorage.setItem('token', token);

        this.user.id = payload['Id'];
        this.user.update({
            username: payload['Username'],
            email: payload['Email'],
            role: payload['Role'],
            logo: payload['Logo']
        } as IUser);

        this.user.fetchRoleData();
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