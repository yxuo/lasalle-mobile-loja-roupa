import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MessageService } from 'primeng/api';
import axios from 'axios';
import { Observable, catchError, map, of } from 'rxjs';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { User } from 'firebase/auth';
import { Endereco, TipoUsuario } from '../../models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  nome: string = '';
  cpf: string = '';
  email: string = '';
  cep: string = '';
  numero: string = '';
  complemento: string = '';
  uf: string = '';
  rua: string = '';
  senha: string = '';
  authRole: string = '';
  tipo: string = 'cliente';

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('role') !== null) {
      this.authRole = localStorage.getItem('role') || '';
    }
  }

  async finderInformationsCep(event: Event) {
    const ev = event.target as HTMLInputElement;
    const cep = ev.value;
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    this.rua = response.data.logradouro;
    this.uf = response.data.uf;
    console.log(response.data);
  }

  createUser(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        console.log(res.user);
        await this.authService.login(this.email, this.senha);
        const endereco: Endereco | undefined =
          this.authRole === 'gerente'
            ? undefined
            : {
                cep: this.cep,
                numero: Number(this.numero),
                complemento: this.complemento,
                rua: this.rua,
                uf: this.uf,
              };
        if (res.user !== null) {
          this.usuarioService.insert(res.user.uid, {
            cpf: this.cpf,
            nome: this.nome,
            endereco,
            tipo: this.tipo as TipoUsuario,
          });
        }
      })
      .catch((err) => {});
  }

  handleRegister() {
    this.createUser(this.email, this.senha);
    this.router.navigate(['/products']);
  }
}
