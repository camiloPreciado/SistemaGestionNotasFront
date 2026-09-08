import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizarProfesorRequest } from 'src/app/core/models/profesor/actualizar-profesor.model';
import { Profesor } from 'src/app/core/models/profesor/profesor.model';
import { ProfesorService } from 'src/app/core/services/profesor.service';

@Component({
  selector: 'app-editar-profesor',
  templateUrl: './editar-profesor.component.html',
  styleUrls: ['./editar-profesor.component.css']
})
export class EditarProfesorComponent implements OnInit {

   profesor: Profesor | null = null;

  id = 0;
  nombre = '';

  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profesorService: ProfesorService
  ) { }

  ngOnInit(): void {
    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const profesorState = history.state.profesor as Profesor;

    if (!profesorState) {
      this.errorMessage =
        'No fue posible cargar la información del profesor.';
      return;
    }

    this.profesor = profesorState;
    this.nombre = profesorState.nombre;
  }

  actualizar(): void {

    if (!this.profesor) {
      return;
    }

    const confirmar = window.confirm(
      '¿Está seguro de actualizar este profesor?'
    );

    if (!confirmar) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const request: ActualizarProfesorRequest = {
      nombre: this.nombre
    };

    this.profesorService
      .actualizar(this.id, request)
      .subscribe(
        () => {
          this.loading = false;

          window.alert(
            'Profesor actualizado correctamente.'
          );

          this.router.navigate(['/profesores']);
        },
        error => {
          console.error(
            'Error actualizando profesor:',
            error
          );

          this.errorMessage =
            error.error?.mensaje ||
            'No fue posible actualizar el profesor.';

          this.loading = false;
        }
      );
  }

  cancelar(): void {
    this.router.navigate(['/profesores']);
  }

}
