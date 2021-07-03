export interface IRole
{
    update (data: any): Promise<void>;
    asJson: Object;
}