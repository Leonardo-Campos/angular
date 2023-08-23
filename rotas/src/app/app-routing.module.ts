import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './guard/auth.guard';


const appRoutes: Routes = [
  {path: 'cursos', loadChildren:  () => import('./cursos/cursos.module').then(m => m.CursosModule), canActivate: [AuthGuard]},
  {path: 'alunos', loadChildren:  () => import('./alunos/alunos.module').then(m => m.AlunosModule), canActivate: [AuthGuard]},
  { path:'login', component: LoginComponent},
  { path:'', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
