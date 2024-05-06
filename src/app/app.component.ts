import { Component } from '@angular/core';
import { Database } from '@angular/fire/database';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  items: MenuItem[] | undefined;
  showNavbar = false;
  constructor(
    private primengConfig: PrimeNGConfig,
    private db: Database,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = (event.url === '/signIn' || event.url === '/signUp');
      }
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    console.log(this.showNavbar)
  }
}
