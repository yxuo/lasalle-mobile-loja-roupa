import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';

/**
 * 1. Pega o login do usuário logado (auth.uid)
 * 2. Pesquisa se tabela usuario.uid.tipo IN <tiposDesesjados>
 * permissoes [logado, cliente, gerente, funcionario]
 */
export const authGuard: CanActivateFn = (route, state) => {
  return (auth: AngularFireAuth, router: Router) => {
    return auth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          router.navigate(['/login']);
        }
      })
    );
  };
  return true;
};
