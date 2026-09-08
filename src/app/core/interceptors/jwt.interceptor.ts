import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

   constructor(private usuarioService: UsuariosService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = this.usuarioService.getToken();

    if (token) {

      const requestConToken = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(requestConToken);
    }

    return next.handle(request);
  }
}
