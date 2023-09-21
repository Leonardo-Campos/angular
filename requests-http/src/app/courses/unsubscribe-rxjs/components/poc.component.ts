import { Component, OnInit } from '@angular/core';
import { SendValueService } from '../send-value-service';

@Component({
  selector: 'app-poc',
  template: `
    <app-poc-base [name]="name"
      [value]="value" style="bg-danger">
    </app-poc-base>
  `
})
export class PocComponent implements OnInit {

  name = 'Component without unsubscribe';
  value!: string;

  constructor(private service: SendValueService) { }

  ngOnInit() {

  }

}
