import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from './_services';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
  constructor(private router: Router, private alertService: AlertService){
    router.events.subscribe(() => {
      alertService.clear();
    });
  }
}
