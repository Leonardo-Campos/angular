import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) {

  }


  login() {
    this.authService.fazerLogin(this.usuario);
  }

}
