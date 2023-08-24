import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosGuard } from '../guard/alunos.guard';
import { AlunosDeactivateGuard } from '../guard/alunos-deactivate.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

const alunosRoutes: Routes = [
  {path: '', component: AlunosComponent,
  canActivateChild: [AlunosGuard],
  children: [
  {path: 'novo', component: AlunoFormComponent},
  {path: ':id', component: AlunoDetalheComponent, resolve: {aluno: AlunoDetalheResolver}},
  {path: ':id/editar', component: AlunosComponent, canDeactivate: [AlunosDeactivateGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule],
})
export class AlunosRoutingModule {}
