import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TipoUsuario } from '../../models/Usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  sidebarVisible: boolean = false;
  isUserLogged: boolean = false;
  tipoUsuario: TipoUsuario | null = null;

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.isUserLogged = this.authService.isLoggedIn;
    const role = localStorage.getItem('role');
    this.tipoUsuario = role ? role as TipoUsuario : null;
  }

  handleLogout() {
    this.isUserLogged = false;
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.isUserLogged = this.authService.isLoggedIn;
  }
}
