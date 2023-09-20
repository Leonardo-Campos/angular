import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './course';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API ='http://localhost:3000/courses';

constructor(private http: HttpClient) { }


list() {
  this.http.get<Course[]>(this.API)
  .pipe(
    tap(console.log)
  );
  }

}
