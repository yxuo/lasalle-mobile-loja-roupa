import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // return (auth: AngularFireAuth, router: Router) => {
  //   return auth.user.pipe(
  //     take(1),
  //     map(user => !!user),
  //     tap(loggedIn => {
  //       if (!loggedIn) {
  //         router.navigate(['/login']);
  //       }
  //     })
  //   );
  // };
  return true;
};
