export interface IUserService
{
    LoginAsync (email: string, password: string) : Object;
    RegisterAsync (username: string, password: string, email: string) : Object;
    UpdateAsync (username?: string, password?: string, email?: string, logo?: string) : Object;
}