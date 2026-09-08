import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrearNotaRequest } from 'src/app/core/models/notas/crear-nota.model';
import { NotaService } from 'src/app/core/services/nota.service';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.component.html',
  styleUrls: ['./crear-nota.component.css']
})
export class CrearNotaComponent {

  idEstudiante: number | null = null;
  nombre = '';
  valor: number | null = null;

  loading = false;
  errorMessage = '';

  constructor(
    private notaService: NotaService,
    private router: Router
  ) { }

  crear(): void {

    if (
      this.idEstudiante === null ||
      !this.nombre.trim() ||
      this.valor === null
    ) {
      this.errorMessage =
        'Todos los campos son obligatorios.';

      return;
    }

    if (this.valor < 0 || this.valor > 5) {
      this.errorMessage =
        'La nota debe estar entre 0 y 5.';

      return;
    }

    const request: CrearNotaRequest = {
      idEstudiante: this.idEstudiante,
      nombre: this.nombre.trim(),
      valor: this.valor
    };

    const confirmar = window.confirm(
      '¿Está seguro de crear esta nota?'
    );

    if (!confirmar) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.notaService.crear(request).subscribe(
      () => {
        window.alert('Nota creada correctamente.');

        this.router.navigate(['/notas']);
      },
      error => {
        console.error('Error creando nota:', error);

        this.errorMessage =
          'No fue posible crear la nota.';

        this.loading = false;
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/notas']);
  }

}
