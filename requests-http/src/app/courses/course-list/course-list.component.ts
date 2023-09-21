import { Component } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Course } from '../course';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  preserveWhitespaces: true
})
export class CourseListComponent {

  courses!: Course[];

  courses$!: Observable<Course[]>;

  constructor(private service: CoursesService) {}

  ngOnInit() {
    // this.courses$ = this.service.list();
  }

}
