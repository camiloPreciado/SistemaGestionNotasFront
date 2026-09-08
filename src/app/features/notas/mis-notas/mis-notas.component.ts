import { Component, OnInit } from '@angular/core';
import { Nota } from 'src/app/core/models/notas/nota.model';
import { NotaService } from 'src/app/core/services/nota.service';

@Component({
  selector: 'app-mis-notas',
  templateUrl: './mis-notas.component.html',
  styleUrls: ['./mis-notas.component.css']
})
export class MisNotasComponent implements OnInit {

   notas: Nota[] = [];

  page = 1;
  pageSize = 10;

  totalItems = 0;
  totalPages = 0;

  loading = false;
  errorMessage = '';

  constructor(
    private notaService: NotaService
  ) { }

  ngOnInit(): void {
    this.obtenerMisNotas();
  }

  obtenerMisNotas(): void {
    this.loading = true;
    this.errorMessage = '';

    this.notaService
      .misNotas(this.page, this.pageSize)
      .subscribe(
        response => {
          this.notas = response.items;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;

          this.loading = false;
        },
        error => {
          console.error('Error obteniendo mis notas:', error);

          this.errorMessage =
            'No fue posible obtener tus notas.';

          this.loading = false;
        }
      );
  }

  paginaAnterior(): void {
    if (this.page > 1) {
      this.page--;
      this.obtenerMisNotas();
    }
  }

  paginaSiguiente(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.obtenerMisNotas();
    }
  }

  cambiarTamanoPagina(): void {
    this.page = 1;
    this.obtenerMisNotas();
  }

}
