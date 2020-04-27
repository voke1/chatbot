export class TreesDto{
   readonly identity:string;
    readonly prompt:string;
    readonly response:{
        readonly buttons:[
            {
                readonly  key:string;
                readonly val:string;
            }
            ]
    }
}