import { Component, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
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
  ) {
    //this.authService.SignOut(true);
  }

  // public login(mail: string, password: string) {
  //   return new Promise((resolve, reject) => {
  //     this.afAuth
  //   })

  // }

  sendLogin() {
    console.log('sendLogin:', this.email, this.password);
    if (this.email !== null && this.password !== null) {
      const users = { email: this.email, password: this.password }
      this.authService.setDataSource(users);
      this.authService.login(this.email, this.password);
    }
  }

  // async signIn() {
  //   try {
  //     this.error.set(null);
  //     if (this.email === null || this.email === '') {
  //       throw ('please enter your email');
  //     } else if (!this.utilsService.emailRegx().test(this.email)) {
  //       throw ('please enter a valid email');
  //     } else if (this.password === null || this.password === '') {
  //       throw ('please enter your password');
  //     } else if (this.password.length < 6) {
  //       throw ('please enter a valid password');
  //     } else {
  //       console.log("SUBMIT");
  //       this.authService.login(this.email, this.password).then((message: any) => {
  //         if (message) {
  //           let error = JSON.parse(JSON.stringify(message));
  //           console.log(error);
  //           if (error.code == "auth/user-not-found") {
  //             this.error.set("There is no user record corresponding to this email. Please Sign Up.");
  //           } else if (error.code == "auth/wrong-password") {
  //             this.error.set("Wrong Password");
  //           } else {
  //             this.error.set('Ops, there\'s an error on your account. Please contact us at ');
  //           }
  //         }
  //       });
  //     }
  //   } catch (err: any) {
  //     this.error.set(err.toString());
  //   }

  // }

  // @todo resetPassword
  async resetPassword() {
    try {
      this.loader = true;
      this.error.set(null);
      /*  this.authService.ForgotPassword(this.email).then(ok=>{
         if (ok.type === 'error') {
           this.error = ok.message;
         } else {
                 
           const dialogRef = this.dialog.open(DialogInfoComponent, {
             disableClose:true,
             width:'400px',
             data:{
               title:'Done',
               message:ok.message
             }
           });
         }
         this.loader = false;
       }) */
    } catch (err) {
      this.error.set(JSON.stringify(err));
      this.loader = false;
    }
  }
}

