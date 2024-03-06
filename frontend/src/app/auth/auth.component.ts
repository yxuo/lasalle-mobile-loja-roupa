import { Component, OnInit, Optional } from '@angular/core';
import { Auth, GoogleAuthProvider, User, authState, signInAnonymously, signInWithPopup, signOut } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { EMPTY, Observable, Subscription, map } from 'rxjs';


/**
 * @see{@link https://github.com/angular/angularfire/blob/master/samples/modular/src/app/auth/auth.component.ts angular-fire - GitHub}
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit{

  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(@Optional() private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    return await signOut(this.auth);
  }
}
