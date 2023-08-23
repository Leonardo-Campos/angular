import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmmiter = new EventEmitter<boolean>();

  fazerLogin(usuario: Usuario) {
    if(usuario.nome === 'usario@email.com' &&
    usuario.senha === '123456') {

      this.usuarioAutenticado = true;

      this.mostrarMenuEmmiter.emit(true);

      this.router.navigate(['/']);


    } else {
      this.usuarioAutenticado = false;

      this.mostrarMenuEmmiter.emit(false);
    }
  }
}
