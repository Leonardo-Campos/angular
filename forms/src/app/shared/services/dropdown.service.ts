import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BrStates } from '../models/br-states';
import { Cities } from '../models/cities';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private http: HttpClient
  ) { }

  getStatesBr() {
    return this.http.get<BrStates[]>('assets/data/brstates.json').pipe();
  }

  getCities(stateId: number) {
    return this.http.get<Cities[]>('assets/data/cities.json')
    .pipe(
      map((cities: Cities[]) => cities.filter(c => c.state == stateId))
    );
  }

  getPositions() {
    return [
      {name: 'Dev', level: 'Junior', description: 'Dev Jr'},
      {name: 'Dev', level: '', description: 'Dev'},
      {name: 'Dev', level: 'Senior', description: 'Dev Senior'},
    ]
  }

  getTechnologies() {
    return [
      {name: 'java', description: 'Java'},
      {name: 'javascript', description: 'JavaScript'},
      {name: 'php', description: 'PHP'},
      {name: 'ruby', description: 'Ruby'},
    ]
  }

  gerNewsLetter() {
    return [
      {name: 's', description: 'Sim'},
      {name: 'n', description: 'Não'}
    ]
  }
}
