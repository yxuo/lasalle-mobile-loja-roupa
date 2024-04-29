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
  authRole: string = '';

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.isUserLogged = this.authService.isLoggedIn;    
    this.authRole = localStorage.getItem('role') || '';
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
