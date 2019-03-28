export interface INonSensitiveUser {
  id?: string;
  name: string;
}

export interface IUser extends INonSensitiveUser {
  uid: string;
  email: string;
}
