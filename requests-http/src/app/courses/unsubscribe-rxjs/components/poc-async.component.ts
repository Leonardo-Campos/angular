import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SendValueService } from '../send-value-service';

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base [name]="name"
      [value]="value" style="bg-success">
    </app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit {

  name = 'Component with async';
  value!: string;

  constructor(private service: SendValueService) { }

  ngOnInit() {

  }

}
