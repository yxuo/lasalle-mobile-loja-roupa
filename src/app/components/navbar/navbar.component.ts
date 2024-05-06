import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TipoUsuario } from '../../models/Usuario';
import { Router } from '@angular/router';
import { ProdutoObservable } from '../../models/Produto';
import { ProdutoService } from '../../services/produto/produto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  sidebarVisible: boolean = false;
  isUserLogged: boolean = false;
  authRole: string = '';
  productsCarts: ProdutoObservable[] = [];
  showCarts: boolean = false;

  constructor(
    private authService: AuthService,
    private produtoService: ProdutoService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isUserLogged = this.authService.isLoggedIn;
    this.authRole = localStorage.getItem('role') || '';
    this.produtoService.products$.subscribe((data) => {
      this.productsCarts = data;
    });
  }

  showCartItems() {
    this.showCarts = true;
  }

  handleLogout() {
    this.isUserLogged = false;
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/signIn']);
  }

  showProfile() {
    this.router.navigate(['/profile']);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.isUserLogged = this.authService.isLoggedIn;
  }
}
