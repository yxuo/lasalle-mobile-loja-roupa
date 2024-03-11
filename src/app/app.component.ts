import { Component } from '@angular/core';
import { Database } from '@angular/fire/database';
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
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
