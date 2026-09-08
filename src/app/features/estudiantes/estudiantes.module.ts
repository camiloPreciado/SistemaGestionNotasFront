import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesComponent } from './estudiantes.component';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionGuard } from 'src/app/core/guards/autenticacion.guard';
import { CrearEstudianteComponent } from './crear-estudiante/crear-estudiante.component';
import { FormsModule } from '@angular/forms';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { EditarEstudianteComponent } from './editar-estudiante/editar-estudiante.component';
import { MisNotasComponent } from '../notas/mis-notas/mis-notas.component';

const routes: Routes = [
  {
    path: '',
    component: EstudiantesComponent,
    canActivate: [AutenticacionGuard,RoleGuard],
    data: {
      roles: ['Admin', 'Profesor']
    }
  },
  {
    path: 'crear',
    component: CrearEstudianteComponent,
    canActivate: [AutenticacionGuard,RoleGuard],
    data: {
      roles: ['Admin', 'Profesor']
    }
  },

  {
    path: 'editar/:id',
    component: EditarEstudianteComponent,
    canActivate: [AutenticacionGuard, RoleGuard],
    data: {
      roles: ['Admin']
    }
  },

  {
    path: 'mis-notas',
    component: MisNotasComponent,
    canActivate: [AutenticacionGuard, RoleGuard],
    data: {
      roles: ['Estudiante']
    }
  },
];

@NgModule({
  declarations: [
    EstudiantesComponent,
    CrearEstudianteComponent,
    EditarEstudianteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EstudiantesModule { }
