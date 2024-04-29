import { Injectable } from '@angular/core';
import { Fornecedor } from '../../models/Fornecedor';
import { Usuario } from '../../models/Usuario';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private db: AngularFireDatabase) {}

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

  getOne(userId: string): Observable<Usuario | null> {
    return this.db
      .object(`usuario/${userId}`)
      .valueChanges()
      .pipe(
        map((usuario) => (usuario as Usuario) || null)
      );
  }

}
