export class User {
  public isAdmin: boolean = false;

  constructor(public displayName: string,
              public email: string,
              public photoURL: string,
              public providerId: string,
              public googleUid: string,
              public uid: string) {
  }
}
