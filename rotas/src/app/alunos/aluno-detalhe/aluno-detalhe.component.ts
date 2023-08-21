import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent implements OnInit {

  inscricao!: Subscription;
  aluno: any;

  constructor(
    private router: ActivatedRoute,
    private redirectRoute: Router,
    private alunoService: AlunosService
  ) {}

  ngOnInit() {
    this.inscricao = this.router.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this.alunoService.getAluno(id);
      }
    );
}

ngOnDestroy() {
  this.inscricao.unsubscribe();

}

editarContato() {
  this.redirectRoute.navigate(['/alunos', this.aluno.id, 'editar']);
}
}
