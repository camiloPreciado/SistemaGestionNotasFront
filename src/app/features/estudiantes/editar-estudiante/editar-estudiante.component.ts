import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizarEstudianteRequest } from 'src/app/core/models/estudiante/actualizar-estudiante.model';
import { Estudiante } from 'src/app/core/models/estudiante/estudiante.model';
import { EstudianteService } from 'src/app/core/services/estudiante.service';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.css']
})
export class EditarEstudianteComponent implements OnInit {

  estudiante: Estudiante | null = null;

  id = 0;

  nombre = '';

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    const estudianteState = history.state.estudiante as Estudiante;

    if (!estudianteState) {
      this.errorMessage = 'No fue posible cargar la información del estudiante.';
      return;
    }

    this.estudiante = estudianteState;
    this.nombre = estudianteState.nombre;
  }

  actualizar(): void {
  if (!this.estudiante) {
    return;
  }

  const confirmar = window.confirm(
    '¿Está seguro de actualizar este estudiante?'
  );

  if (!confirmar) {
    return;
  }

  this.loading = true;
  this.errorMessage = '';

  const request: ActualizarEstudianteRequest = {
    usuarioId: this.estudiante.usuarioId,
    nombre: this.nombre
  };

  this.estudianteService
    .actualizar(this.id, request)
    .subscribe(
      () => {
        this.loading = false;

        window.alert(
          'Estudiante actualizado correctamente.'
        );

        this.router.navigate(['/estudiantes']);
      },
      error => {
        console.error('Error actualizando estudiante:', error);

        this.errorMessage =
          error.error?.mensaje ||
          'No fue posible actualizar el estudiante.';

        this.loading = false;
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/estudiantes']);
  }

}
