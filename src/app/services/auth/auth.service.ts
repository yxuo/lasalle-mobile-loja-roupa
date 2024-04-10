import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { getAuth, getIdToken } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/User';

interface user {
  email: string, password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataSourceSubject = new BehaviorSubject<any>({});
  dataSource$ = this.dataSourceSubject.asObservable();
  users: user;

  setDataSource(value: user): void {
    this.login(value.email, value.password);
    this.dataSourceSubject.next(value);
  }

  userData = signal<any>(null);
  message: any = null;

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    public router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    const localStorage = document.defaultView?.localStorage;
    // this.afAuth.authState.subscribe(async (user: any) => {
    //   if (localStorage) {
    //     if (user) {
    //       let userTokenData: any = await user.getIdTokenResult();
    //       setStorage('user', user);
    //       setStorage('claims', userTokenData.claims);
    //       localStorage.setItem('user', JSON.stringify(user));
    //       localStorage.setItem('claims', JSON.stringify(userTokenData.claims));
    //       console.log('LS 1', localStorage)
    //       this.userData.set(JSON.parse(localStorage?.getItem('user')!));
    //     } else {
    //       setStorage('user', '');
    //       setStorage('claims', '');
    //       console.log('LS 2', localStorage)
    //       localStorage.setItem('user', '');
    //       localStorage.setItem('claims', '');
    //       this.userData.set(null);
    //     }
    //   }
    // });
    // this.authFirebase()
  }

  async authFirebase() {
    this.afAuth.authState.subscribe(user => {
      const use = user?.getIdToken(true)
      console.log("auth:", use)
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userData.set(JSON.parse(localStorage.getItem('user')!));
    return user !== null;
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        const userInfo: any = result.user?.toJSON()
        console.log(userInfo.uid)
        localStorage.setItem('user', JSON.stringify(userInfo.uid));
        // this.afAuth.authState.subscribe(async (user: any) => {
        //   if (user) {
        //     this.router.navigate(['']);
        //   }
        // });
      })
      .catch((error: any) => {
        return error;
      });
  }

  public signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        return { type: 'ok', data: JSON.parse(JSON.stringify(result)) };
      })
      .catch((error: any) => {
        return { type: 'error', error: JSON.parse(JSON.stringify(error)) };
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        return { type: 'ok', message: 'Please check your email. We\'ve just sent a link to reset your password' };
      })
      .catch((error: any) => {
        return { type: 'error', message: error };
      });
  }


  // Sign out
  SignOut(redirect: boolean) {
    return new Promise((resolve, reject) => {
      this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('claims');
        if (redirect)
          this.router.navigate(['login']);

        resolve(true);
      });
    });
  }

  async getToken() {
    const auth = getAuth()
    const { currentUser } = auth
    if (currentUser) {
      const token = await getIdToken(currentUser, true);
      return token;
    }

    return null;
  }

  async getUserData() {
    let token = await this.getToken();
    if (token) {
      console.log(token);
      // @todo call api to get user data;
      let data = {};
      return data;
    } else {
      throw ('No valid token')
    }
  }

}
