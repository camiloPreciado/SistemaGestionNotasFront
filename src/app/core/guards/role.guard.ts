import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const rolUsuario = this.usuarioService.getRol();

    const rolesPermitidos = route.data['roles'] as string[];

    if (rolUsuario && rolesPermitidos.includes(rolUsuario)) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
  
}
