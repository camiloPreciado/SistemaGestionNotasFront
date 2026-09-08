import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../models/estudiante/estudiante.model';
import { PagedResponse } from '../models/paged-response.model';
import { Observable } from 'rxjs';
import { ActualizarEstudianteRequest } from '../models/estudiante/actualizar-estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

   private apiUrl = `${environment.estudiantesApiUrl}/api/Estudiantes`;

  constructor(private http: HttpClient) { }

  obtenerTodos(
    page: number,
    pageSize: number
  ): Observable<PagedResponse<Estudiante>> {

    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<Estudiante>>(
      this.apiUrl,
      { params }
    );
  }

  actualizar(
    id: number,
    request: ActualizarEstudianteRequest
  ): Observable<void> {

    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
