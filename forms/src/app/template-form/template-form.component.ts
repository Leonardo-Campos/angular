import { Component } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent {

  usuario: any = {
    nome: 'Leonardo',
    email: 'leonardo@gmail.com'
  }

  onSubmit(form: any) {
    console.log(form);
  }

}
