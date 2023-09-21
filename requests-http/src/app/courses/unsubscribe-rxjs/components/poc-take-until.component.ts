import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SendValueService } from '../send-value-service';

@Component({
  selector: 'app-poc-take-until',
  template: `
    <app-poc-base [name]="name"
      [value]="value" style="bg-primary">
    </app-poc-base>
  `
})
export class PocTakeUntilComponent implements OnInit {

  name = 'Component with takeUntil';
  value!: string;

  constructor(private service: SendValueService) {}

  ngOnInit() {

  }
}
