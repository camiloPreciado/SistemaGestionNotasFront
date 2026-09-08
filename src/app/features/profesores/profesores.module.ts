import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../../core/guards/role.guard';
import { ProfesoresComponent } from './profesores.component';
import { AutenticacionGuard } from 'src/app/core/guards/autenticacion.guard';
import { CrearProfesorComponent } from './crear-profesor/crear-profesor.component';
import { EditarProfesorComponent } from './editar-profesor/editar-profesor.component';

const routes: Routes = [
  {
    path: '',
    component: ProfesoresComponent,
    canActivate: [AutenticacionGuard, RoleGuard],
    data: {
      roles: ['Admin']
    },
  },
  {
    path: 'crear',
    component: CrearProfesorComponent,
    canActivate: [AutenticacionGuard, RoleGuard],
    data: {
      roles: ['Admin']
    }
  },
  {
    path: 'editar/:id',
    component: EditarProfesorComponent,
    canActivate: [AutenticacionGuard, RoleGuard],
    data: {
      roles: ['Admin']
    }
  },
];

@NgModule({
  declarations: [
    ProfesoresComponent,
    CrearProfesorComponent,
    EditarProfesorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfesoresModule { }