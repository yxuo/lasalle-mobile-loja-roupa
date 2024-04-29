import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  sidebarVisible: boolean = false;
  isUserLogged: boolean = false;

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.isUserLogged = this.authService.isLoggedIn;
  }
}
