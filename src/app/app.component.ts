import { Component } from '@angular/core';
import { UsuariosService } from './core/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rol: string | null = null;

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actualizarSesion();
  }

  mostrarHeader(): boolean {
    return this.usuarioService.isAuthenticated();
  }

  actualizarSesion(): void {
    this.rol = this.usuarioService.getRol();
  }

  cerrarSesion(): void {
    this.usuarioService.logout();
    sessionStorage.clear();

    this.rol = null;

    this.router.navigate(['/login']);
  }

  irAlDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
