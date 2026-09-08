import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nota } from 'src/app/core/models/notas/nota.model';
import { NotaService } from 'src/app/core/services/nota.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

   notas: Nota[] = [];

  page = 1;
  pageSize = 10;

  totalItems = 0;
  totalPages = 0;

  loading = false;
  errorMessage = '';

  constructor(
    private notaService: NotaService,
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('NotasComponent iniciado');
    this.obtenerNotas();
  }

  obtenerNotas(): void {
    console.log('obtenerNotas() ejecutado');
    this.loading = true;
    this.errorMessage = '';

    this.notaService
      .obtenerTodos(this.page, this.pageSize)
      .subscribe(
        response => {
           console.log('Respuesta notas:', response);
          this.notas = response.items;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;

          this.loading = false;
        },
        error => {
          console.error('Error obteniendo notas:', error);
          console.error('Error obteniendo notas:', error);

          this.errorMessage =
            'No fue posible obtener las notas.';

          this.loading = false;
        }
      );
  }

  paginaAnterior(): void {
    if (this.page > 1) {
      this.page--;
      this.obtenerNotas();
    }
  }

  paginaSiguiente(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.obtenerNotas();
    }
  }

  esProfesor(): boolean {
    const rol = this.usuarioService.getRol();

    return rol === 'Profesor';
  }

  editar(nota: Nota): void {
    this.router.navigate(
      ['/notas/editar', nota.id],
      {
        state: {
          nota: nota
        }
      }
    );
  }

  eliminar(nota: Nota): void {
    const confirmar = window.confirm(
      `¿Está seguro de eliminar la nota "${nota.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    this.notaService
      .eliminar(nota.id)
      .subscribe(
        () => {
          window.alert('Nota eliminada correctamente.');

          this.obtenerNotas();
        },
        error => {
          console.error('Error eliminando nota:', error);

          window.alert(
            'No fue posible eliminar la nota.'
          );
        }
      );
  }

}
