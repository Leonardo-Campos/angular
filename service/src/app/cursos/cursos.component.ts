import { Component } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  providers: [CursosService]
})
export class CursosComponent {

  cursos: string[] | undefined  = [];

  // cursosService: CursosService | undefined;

  constructor(private cursosService: CursosService) {
    // this.cursosService = new CursosService();
    // this.cursosService = _cursosService;
  }

  ngOnInit() {
    this.cursos = this.cursosService?.getCursos();

    CursosService.criouNovoCurso.subscribe(
      curso => this.cursos?.push(curso)
    );
  }

}
