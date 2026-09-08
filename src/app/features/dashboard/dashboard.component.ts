import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    rol: string | null = null;

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.rol = this.usuarioService.getRol();
  }

  esAdminOProfesor(): boolean {
    return this.rol === 'Admin' || this.rol === 'Profesor';
  }

  esEstudiante(): boolean {
    return this.rol === 'Estudiante';
  }

  cerrarSesion(): void {
    this.usuarioService.logout();
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}
