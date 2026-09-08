import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizarNotaRequest } from 'src/app/core/models/notas/actualizar-nota.model';
import { Nota } from 'src/app/core/models/notas/nota.model';
import { NotaService } from 'src/app/core/services/nota.service';

@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.component.html',
  styleUrls: ['./editar-nota.component.css']
})
export class EditarNotaComponent implements OnInit {

  id: number | null = null;

  nombre = '';
  valor: number | null = null;

  idEstudiante: number | null = null;
  nombreEstudiante = '';
  idProfesor: number | null = null;
  nombreProfesor = '';

  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notaService: NotaService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    const nota = history.state.nota as Nota;

    if (!nota) {
      this.router.navigate(['/notas']);
      return;
    }

    this.nombre = nota.nombre;
    this.valor = nota.valor;

    this.idEstudiante = nota.idEstudiante;
    this.nombreEstudiante = nota.nombreEstudiante;

    this.idProfesor = nota.idProfesor;
    this.nombreProfesor = nota.nombreProfesor;
  }

  actualizar(): void {

    if (
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

    if (this.id === null) {
      return;
    }

    const request: ActualizarNotaRequest = {
      nombre: this.nombre.trim(),
      valor: this.valor
    };

    const confirmar = window.confirm(
      '¿Está seguro de actualizar esta nota?'
    );

    if (!confirmar) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.notaService
      .actualizar(this.id, request)
      .subscribe(
        () => {
          window.alert('Nota actualizada correctamente.');

          this.router.navigate(['/notas']);
        },
        error => {
          console.error('Error actualizando nota:', error);

          this.errorMessage =
            'No fue posible actualizar la nota.';

          this.loading = false;
        }
      );
  }

  cancelar(): void {
    this.router.navigate(['/notas']);
  }

}
