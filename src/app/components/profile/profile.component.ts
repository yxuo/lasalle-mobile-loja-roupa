import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/Usuario';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  usuario$: Observable<Usuario>;
  usuario: Usuario = new Usuario();

  constructor(
    private userService: UsuarioService,
    private authService: AuthService,
    private db: AngularFireDatabase,
  ) {
    this.usuario.nome = 'TESTE';
  }

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      console.log('USER', user);
      this.usuario = user;
    });
    const userId = localStorage.getItem('user') as string;
    this.getOne(userId);
  }

  getOne(userId: string) {
    const user = this.db
      .object(`usuario/${userId}`)
      .valueChanges()
      .pipe(map((usuario) => (usuario as Usuario) || null))
      .forEach((u) => {
        console.log('AA = ', u)
      });
    console.log('getOne user', userId, user)
  }

  getUser() {
    const userId = JSON.stringify(localStorage.getItem('user'));
    return this.userService.getOne(userId) || of(new Usuario());
  }
}
