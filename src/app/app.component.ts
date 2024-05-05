import { Component } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  items: MenuItem[] | undefined;
  constructor(
    private primengConfig: PrimeNGConfig,
    private db: Database,
    private router: Router
  ) {}

  checkEmployee(): boolean {
    if (localStorage.getItem('role') !== undefined) {
      const role = localStorage.getItem('role');
      return role === 'funcionario';
    }
    return false;
  }

  checkAdmin(): boolean {
    if (localStorage.getItem('role') !== undefined) {
      const role = localStorage.getItem('role');
      return role === 'gerente';
    }
    return false;
  }

  checkCustomer(): boolean {
    if (localStorage.getItem('role') !== undefined) {
      const role = localStorage.getItem('role');
      return role === 'cliente';
    }
    return false;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
