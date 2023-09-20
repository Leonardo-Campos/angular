import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './course';
import { tap } from 'rxjs/operators';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API =`${environment.API}courses`;

constructor(private http: HttpClient) { }


list() {
  this.http.get<Course[]>(this.API)
  .pipe(
    tap(console.log)
  );
  }

}
