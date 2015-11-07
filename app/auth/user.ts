module app{

  export interface IUser {
   name:string;
   email:string,
   password:string
  }


  export class User implements IUser{
    constructor(public name:string=null,
                public email:string=null,
                public password:string=null){
    }
  }

}
