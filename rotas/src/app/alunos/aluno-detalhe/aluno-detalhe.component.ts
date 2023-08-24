import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent implements OnInit {

  inscricao!: Subscription;
  aluno!: Aluno;

  constructor(
    private route: ActivatedRoute,
    private redirectRoute: Router,
    private alunoService: AlunosService
  ) {}

  ngOnInit() {
      this.inscricao = this.route.data.subscribe(
        (info) => {
          this.aluno = info['aluno'];
        });
}

ngOnDestroy() {
  this.inscricao.unsubscribe();

}

editarContato() {
  this.redirectRoute.navigate(['/alunos', this.aluno.id, 'editar']);
}
}
