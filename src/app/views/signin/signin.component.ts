import { Component, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  email: string | null = null;
  password: string | null = null;
  confirmPassword: string | null = null;
  error = signal<string | null>(null);
  loader: boolean = false;

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private messageService: MessageService
  ) {}

  sendLogin() {
    console.log('sendLogin:', this.email, this.password);
    try {
      if (this.email !== null && this.password !== null) {
        const users = { email: this.email, password: this.password };
        this.authService.setDataSource(users);
        this.authService.login(this.email, this.password);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Logado com sucesso',
        });
      }
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Usuario nao existe',
      });
    }
  }

  async resetPassword() {
    try {
      this.loader = true;
      this.error.set(null);
    } catch (err) {
      this.error.set(JSON.stringify(err));
      this.loader = false;
    }
  }
}
