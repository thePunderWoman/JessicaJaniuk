import { AngularFire } from 'angularfire2';

export class User {
  public isAdmin: boolean = false;

  constructor(private af: AngularFire,
              public displayName: string,
              public email: string,
              public photoURL: string,
              public providerId: string,
              public googleUid: string,
              public uid: string) {
    this.determineAdmin = this.determineAdmin.bind(this);
    af.database.object(`/users/${uid}`).subscribe(this.determineAdmin);
  }

  private determineAdmin(user) {
    this.isAdmin = user && user.level === 100;
  }
}
