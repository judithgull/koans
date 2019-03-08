export interface INonSensitiveUser {
  id?: string;
  name: string;
}

export interface IUser extends INonSensitiveUser {
  uid: string;
  email: string;
}

export class User {
  _id?: string;
  constructor(
    public name: string = null,
    public email: string = null,
    public password: string = null
  ) {}
}
