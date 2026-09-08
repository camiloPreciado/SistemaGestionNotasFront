import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/core/models/profesor/profesor.model';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

   profesores: Profesor[] = [];

  page = 1;
  pageSize = 1;

  totalItems = 0;
  totalPages = 0;

  loading = false;
  errorMessage = '';

  constructor(
    private profesorService: ProfesorService,
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerProfesores();
  }

  obtenerProfesores(): void {
    this.loading = true;
    this.errorMessage = '';

    this.profesorService
      .obtenerTodos(this.page, this.pageSize)
      .subscribe(
        response => {
          this.profesores = response.items;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error => {
          console.error('Error obteniendo profesores:', error);

          this.errorMessage =
            'No fue posible obtener los profesores.';

          this.loading = false;
        }
      );
  }

  paginaAnterior(): void {
    if (this.page > 1) {
      this.page--;
      this.obtenerProfesores();
    }
  }

  paginaSiguiente(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.obtenerProfesores();
    }
  }

  esAdmin(): boolean {
    return this.usuarioService.getRol() === 'Admin';
  }

  editar(profesor: Profesor): void {
    this.router.navigate(
      ['/profesores/editar', profesor.id],
      {
        state: {
          profesor: profesor
        }
      }
    );
  }

  eliminar(profesor: Profesor): void {
    const confirmar = window.confirm(
      `¿Está seguro de eliminar al profesor "${profesor.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.profesorService
      .eliminar(profesor.id)
      .subscribe(
        () => {
          this.loading = false;

          window.alert(
            'Profesor eliminado correctamente.'
          );

          this.obtenerProfesores();
        },
        error => {
          console.error('Error eliminando profesor:', error);

          this.errorMessage =
            error.error?.mensaje ||
            'No fue posible eliminar el profesor.';

          this.loading = false;
        }
      );
  }
}
