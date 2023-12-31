import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';


import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './guard/auth.guard';
import { CursosGuard } from './guard/cursos.guard';
import { AlunosGuard } from './guard/alunos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';


const appRoutes: Routes = [
  {path: 'cursos', loadChildren:  () => import('./cursos/cursos.module').then(m => m.CursosModule), canActivate: [AuthGuard], canActivateChild: [CursosGuard], canLoad: [AuthGuard]},
  {path: 'alunos', loadChildren:  () => import('./alunos/alunos.module').then(m => m.AlunosModule), canActivate: [AuthGuard] , canLoad: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
