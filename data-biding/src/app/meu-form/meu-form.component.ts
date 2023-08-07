import { Component } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.scss']
})
export class MeuFormComponent {

  nome: string = '';

  pessoa: any = {
    nome: 'def',
    idade: 20
  }


}
