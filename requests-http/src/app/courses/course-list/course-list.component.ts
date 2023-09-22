import { Component } from '@angular/core';
import { Course } from '../course';
import { CoursesService } from '../courses.service';
import { Observable, Subject, catchError, empty } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  preserveWhitespaces: true
})
export class CourseListComponent {

  //courses!: Course[];

  courses$!: Observable<Course[]>;
  error$ = new Subject<{ message: string }>();

  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private service: CoursesService) { }

  ngOnInit() {
    console.log("ngOnInit is called");
    //this.service.list()
    this.onRefresh();
   //  .subscribe(data => {
   //    console.log("Received data:", data);
   //    this.courses = data;
   //  });

    // this.courses$ = this.service.list();
  }

  onRefresh() {
    this.courses$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next({ message: 'Error when loading courses. Try again later.' });
        return empty();
      })
    );

    this.service.list()
    //.pipe(
    //  catchError(error => empty())
    //)
    .subscribe(data => {
      console.log(data);
    },
    err => console.error(err),
    () => console.log('Complete Observable')
    )
  }
}
