import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SendValueService } from '../send-value-service';

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [name]="name"
      [value]="value" style="bg-secondary">
    </app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit {

  name = 'Component with unsubscribe';
  value!: string;

  constructor(private service: SendValueService) { }

  ngOnInit() {

  }

}
