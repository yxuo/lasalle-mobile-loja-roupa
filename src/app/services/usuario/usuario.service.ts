import { Injectable } from '@angular/core';
import { Fornecedor } from '../../models/Fornecedor';
import { Usuario } from '../../models/Usuario';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userSubject = new Subject<Usuario>();
  user$ = this.userSubject.asObservable();

  constructor(private db: AngularFireDatabase) {}

  setUser(value: Usuario): void {
    this.userSubject.next(value);
  }

  insert(uuid: string, usuario: Usuario) {
    console.log('INSERT USUARIO', usuario);
    this.db
      .object(`usuario/${uuid}`)
      .set(usuario)
      .then((result: any) => {
        console.log(result);
      });
  }

  getAll(): Observable<Usuario[]> {
    return this.db
      .list('usuario')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            key: c.payload.key,
            ...{
              ...(c.payload.val() as Usuario),
            },
          }));
        })
      );
  }

  getOne(userId: string) {
    return this.db
      .object(`usuario/${userId}`)
      .valueChanges()
      .pipe(map((usuario) => (usuario as Usuario) || null))
      .forEach((u) => u).then((usuario) =>{console.log('piru do: ',usuario)}).catch((err) =>{console.error(err)});
  }

  getOneTeste(userId: string) {
    console.log(userId);
    return this.db.object(`usuario/${userId}`);
  }
}
