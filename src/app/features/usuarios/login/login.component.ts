import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/login/login.model';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  ngOnInit(): void {
    sessionStorage.clear();
    localStorage.clear();
  }

  login: LoginRequest = {
    correo: '',
    contrasena: ''
  };

  errorMessage = '';
  loading = false;

  constructor(
    private authService: UsuariosService,
    private router: Router
  ) { }

  onSubmit(): void {

    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.login).subscribe(
      response => {

        console.log('Login exitoso:', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('expiracion', response.expiracion);

        this.loading = false;

        this.router.navigate(['/dashboard']);
      },
      error => {

        console.error('Error de login:', error);

        this.errorMessage = 'Correo o contraseña incorrectos.';
        this.loading = false;
      }
    );
  }
}
