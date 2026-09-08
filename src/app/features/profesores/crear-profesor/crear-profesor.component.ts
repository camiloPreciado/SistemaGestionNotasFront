import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroProfesorRequest } from 'src/app/core/models/profesor/registro-profesor.model';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.css']
})
export class CrearProfesorComponent {

  profesor: RegistroProfesorRequest = {
    correo: '',
    contrasena: '',
    nombre: ''
  };

  loading = false;
  errorMessage = '';

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  registrar(): void {

    const confirmar = window.confirm(
      '¿Está seguro de crear este profesor?'
    );

    if (!confirmar) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.usuarioService
      .registrarProfesor(this.profesor)
      .subscribe(
        response => {
          console.log('Profesor registrado:', response);

          this.loading = false;

          window.alert(
            'Profesor creado correctamente.'
          );

          this.router.navigate(['/profesores']);
        },
        error => {
          console.error('Error registrando profesor:', error);

          this.errorMessage =
            error.error?.mensaje ||
            'No fue posible registrar el profesor.';

          this.loading = false;
        }
      );
  }

  cancelar(): void {
    this.router.navigate(['/profesores']);
  }
}
