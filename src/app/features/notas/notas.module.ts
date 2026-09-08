import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotasRoutingModule } from './notas-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NotasComponent } from './notas.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { AutenticacionGuard } from 'src/app/core/guards/autenticacion.guard';
import { FormsModule } from '@angular/forms';
import { MisNotasComponent } from './mis-notas/mis-notas.component';
import { CrearNotaComponent } from './crear-nota/crear-nota.component';
import { EditarNotaComponent } from './editar-nota/editar-nota.component';


const routes: Routes = [
  {
    path: 'crear',
    component: CrearNotaComponent,
    canActivate: [AutenticacionGuard, RoleGuard],
    data: {
      roles: ['Profesor']
    }
  },
  {
    path: 'editar/:id',
    component: EditarNotaComponent,
    canActivate: [AutenticacionGuard, RoleGuard],
    data: {
      roles: ['Admin', 'Profesor']
    }
  },
  {
    path: '',
    component: NotasComponent,
    canActivate: [AutenticacionGuard, RoleGuard],
    data: {
      roles: ['Admin', 'Profesor']
    }
  },
  {
    path: 'mis-notas',
    component: MisNotasComponent,
    canActivate: [AutenticacionGuard, RoleGuard],
    data: {
      roles: ['Estudiante']
    }
  }
  
];

@NgModule({
   declarations: [
    NotasComponent,
    MisNotasComponent,
    CrearNotaComponent,
    EditarNotaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class NotasModule { }
