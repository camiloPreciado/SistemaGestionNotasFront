import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login/login.model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login/login-response.model';
import { RegistroEstudianteRequest } from '../models/estudiante/registro-estudiante.model';
import { RegistroEstudianteResponse } from '../models/estudiante/registro-estudiante-response';
import { RegistroProfesorRequest } from '../models/profesor/registro-profesor.model';
import { RegistroProfesorResponse } from '../models/profesor/registro-profesor-response';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = `${environment.usuarioApiUrl}/api/Usuario`;

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

   isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('expiracion');
  }

  registrarEstudiante(
    request: RegistroEstudianteRequest
  ): Observable<RegistroEstudianteResponse> {

    return this.http.post<RegistroEstudianteResponse>(
      `${environment.usuarioApiUrl}/api/Usuario/registro-estudiante`,
      request
    );
  }

  registrarProfesor(
    request: RegistroProfesorRequest
  ): Observable<RegistroProfesorResponse> {

    return this.http.post<RegistroProfesorResponse>(
      `${environment.usuarioApiUrl}/api/Usuario/registro-profesor`,
      request
    );
  }
}
