import { Component } from '@angular/core';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.scss']
})
export class ExemplosPipesComponent {

  livro: any = {
    titulo: 'Learning JavaScript',
    rating: 4.545,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRp'
  };

  livros: string[] = ['Java', 'Angular 2'];

  filtro!: string;


  addCurso(valor: string) {
    this.livros.push(valor);
  }

  obterCursos() {
    if(this.livros.length === 0 ||
       this.filtro === undefined ||
       this.filtro.trim() === ''
       ) {
      return this.livros;
    }
    return this.livros.filter((v: string) => {
      if (v.toLocaleLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true;

      }  return false;

    });
  }

  asyncValue = new Promise<string>((resolve, reject) => {
    setTimeout(() => resolve('Async Value'), 1000)
  });


}
