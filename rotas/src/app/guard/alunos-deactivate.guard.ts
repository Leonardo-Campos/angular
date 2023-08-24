import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlunoFormComponent } from '../alunos/aluno-form/aluno-form.component';
import { IFormCanDeactivate } from './iform-candeactivate';

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate>{


  canDeactivate(
     component: IFormCanDeactivate,
     currentRoute: ActivatedRouteSnapshot,
     currentState: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean > {


    return component.podeDesativar();
  }





}
