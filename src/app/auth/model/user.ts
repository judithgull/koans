export class User {
  _id?: string;
  constructor(public name: string = null,
    public email: string = null,
    public password: string = null) {
  }
}
