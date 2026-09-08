import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/core/models/estudiante/estudiante.model';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  estudiantes: Estudiante[] = [];

  page = 1;
  pageSize = 10;

  totalItems = 0;
  totalPages = 0;

  loading = false;
  errorMessage = '';

  constructor(
    private estudianteService: EstudianteService,
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  obtenerEstudiantes(): void {

    this.loading = true;
    this.errorMessage = '';

    this.estudianteService
      .obtenerTodos(this.page, this.pageSize)
      .subscribe(
        response => {

          this.estudiantes = response.items;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;

          this.loading = false;
        },
        error => {

          console.error('Error obteniendo estudiantes:', error);

          this.errorMessage = 'No fue posible obtener los estudiantes.';
          this.loading = false;
        }
      );
  }

  paginaAnterior(): void {

  if (this.page > 1) {
      this.page--;
      this.obtenerEstudiantes();
    }

  }

  paginaSiguiente(): void {

    if (this.page < this.totalPages) {
      this.page++;
      this.obtenerEstudiantes();
    }
  }

  esAdmin(): boolean {
    return this.usuarioService.getRol() === 'Admin';
  }

  editar(estudiante: Estudiante): void {
    this.router.navigate(
      ['/estudiantes/editar', estudiante.id],
      {
        state: {
          estudiante: estudiante
        }
      }
    );
  }

  eliminar(estudiante: Estudiante): void {
    const confirmar = window.confirm(
      `¿Está seguro de eliminar al estudiante "${estudiante.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.estudianteService
      .eliminar(estudiante.id)
      .subscribe(
        () => {
          this.loading = false;

          window.alert(
            'Estudiante eliminado correctamente.'
          );

          this.obtenerEstudiantes();
        },
        error => {
          console.error('Error eliminando estudiante:', error);

          this.errorMessage =
            error.error?.mensaje ||
            'No fue posible eliminar el estudiante.';

          this.loading = false;
        }
      );
  }
}
