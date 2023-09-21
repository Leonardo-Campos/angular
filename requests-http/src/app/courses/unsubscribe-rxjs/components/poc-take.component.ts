import { Component, OnInit } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { SendValueService } from '../send-value-service';

@Component({
  selector: 'app-poc-take',
  template: `
    <app-poc-base [name]="name"
      [value]="value" style="bg-info">
    </app-poc-base>
  `
})
export class PocTakeComponent implements OnInit {

  name = 'Component with take';
  value!: string;

  constructor(private service: SendValueService) {}

  ngOnInit() {

  }
}
