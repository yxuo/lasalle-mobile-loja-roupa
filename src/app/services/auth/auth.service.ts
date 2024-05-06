import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { getAuth, getIdToken } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthUser } from '../../models/AuthUser';
import { Usuario } from '../../models/Usuario';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataSourceSubject = new BehaviorSubject<any>({});
  dataSource$ = this.dataSourceSubject.asObservable();
  users: AuthUser;
  usersInfo: Usuario;
  user: any;
  userData = signal<any>(null);
  message: any = null;

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    public router: Router,
    private db: AngularFireDatabase,
    @Inject(DOCUMENT) private document: Document
  ) {
    const localStorage = document.defaultView?.localStorage;
  }

  setDataSource(value: AuthUser): void {
    this.login(value.email, value.password);
    this.dataSourceSubject.next(value);
  }

  async authFirebase() {
    this.afAuth.authState.subscribe((user) => {
      const use = user?.getIdToken(true);
      console.log('auth:', use);
    });
  }

  get isLoggedIn(): boolean {
    if (!localStorage) {
      return false;
    }
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userData.set(JSON.parse(localStorage.getItem('user')!));
    return user !== null;
  }

  async login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const userInfo: any = result.user?.toJSON();
        localStorage.setItem('user', JSON.stringify(userInfo.uid));
        console.log(userInfo);
        this.getOne(userInfo.uid);
      })
      .catch((error: any) => {
        return error;
      });
  }

  getOne(userId: string) {
    const user = this.db
      .object(`usuario/${userId}`)
      .valueChanges()
      .pipe(map((usuario) => (usuario as Usuario) || null))
      .forEach((u) => {
        localStorage.setItem('role', u.tipo);
      });
  }

  public async signUp(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return { type: 'ok', data: JSON.parse(JSON.stringify(result)) };
    } catch (error) {
      return { type: 'error', error: JSON.parse(JSON.stringify(error)) };
    }
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        return {
          type: 'ok',
          message:
            "Please check your email. We've just sent a link to reset your password",
        };
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
        localStorage.removeItem('role');
        localStorage.removeItem('claims');
        if (redirect) this.router.navigate(['login']);

        resolve(true);
      });
    });
  }

  async getToken() {
    const auth = getAuth();
    const { currentUser } = auth;
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
      throw 'No valid token';
    }
  }
}
