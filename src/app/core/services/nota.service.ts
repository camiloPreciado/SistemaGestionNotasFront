import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PagedResponse } from '../models/paged-response.model';
import { Nota } from '../models/notas/nota.model';
import { CrearNotaRequest } from '../models/notas/crear-nota.model';
import { ActualizarNotaRequest } from '../models/notas/actualizar-nota.model';


@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private apiUrl = `${environment.notasApiUrl}/api/Notas`;

  constructor(private http: HttpClient) { }

  obtenerTodos(
    page: number,
    pageSize: number
  ): Observable<PagedResponse<Nota>> {

    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<Nota>>(
      this.apiUrl,
      { params }
    );
  }

  misNotas(
    page: number,
    pageSize: number
  ): Observable<PagedResponse<Nota>> {

    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<Nota>>(
      `${this.apiUrl}/mis-notas`,
      { params }
    );
  }

  crear(
    request: CrearNotaRequest
  ): Observable<Nota> {

    return this.http.post<Nota>(
      this.apiUrl,
      request
    );
  }

  actualizar(
    id: number,
    request: ActualizarNotaRequest
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