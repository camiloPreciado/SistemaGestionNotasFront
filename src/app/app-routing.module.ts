import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AutenticacionGuard } from './core/guards/autenticacion.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'estudiantes',
    loadChildren: () =>
      import('./features/estudiantes/estudiantes.module')
        .then(m => m.EstudiantesModule)
  },
  {
  path: 'profesores',
    loadChildren: () =>
      import('./features/profesores/profesores.module')
        .then(m => m.ProfesoresModule)
  },
  {
  path: 'notas',
    loadChildren: () =>
      import('./features/notas/notas.module')
        .then(m => m.NotasModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }