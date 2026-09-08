import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { PagedResponse } from '../models/paged-response.model';
import { Profesor } from '../models/profesor/profesor.model';
import { ActualizarProfesorRequest } from '../models/profesor/actualizar-profesor.model';


@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private apiUrl = `${environment.profesoresApiUrl}/api/Profesores`;

  constructor(private http: HttpClient) { }

  obtenerTodos(
    page: number,
    pageSize: number
  ): Observable<PagedResponse<Profesor>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<Profesor>>(
      this.apiUrl,
      { params }
    );
  }

  actualizar(
    id: number,
    request: ActualizarProfesorRequest
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