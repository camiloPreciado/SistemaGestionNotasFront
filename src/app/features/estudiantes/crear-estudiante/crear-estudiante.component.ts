import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroEstudianteRequest } from 'src/app/core/models/estudiante/registro-estudiante.model';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-crear-estudiante',
  templateUrl: './crear-estudiante.component.html',
  styleUrls: ['./crear-estudiante.component.css']
})
export class CrearEstudianteComponent {

  estudiante: RegistroEstudianteRequest = {
    correo: '',
    contrasena: '',
    nombre: ''
  };

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  registrar(): void {
  const confirmar = window.confirm(
    '¿Está seguro de crear este estudiante?'
  );

  if (!confirmar) {
    return;
  }

  this.loading = true;
  this.errorMessage = '';
  this.successMessage = '';

  this.usuarioService
    .registrarEstudiante(this.estudiante)
    .subscribe(
      response => {
        console.log('Estudiante registrado:', response);

        this.loading = false;

        window.alert(
          'Estudiante creado correctamente.'
        );

        this.estudiante = {
          correo: '',
          contrasena: '',
          nombre: ''
        };
      },
      error => {
        console.error('Error registrando estudiante:', error);

        this.errorMessage =
          error.error?.mensaje ||
          'No fue posible registrar el estudiante.';

        this.loading = false;
      }
    );
}

  cancelar(): void {
    this.router.navigate(['/estudiantes']);
  }
}
