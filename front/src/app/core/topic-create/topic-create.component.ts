import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TopicService, AlertService } from '../../_services';
import { User } from '../../_models';

@Component({
    templateUrl: 'topic-create.component.html'
})

export class TopicCreateComponent implements OnInit {
  constructor(
    private TopicService: TopicService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  currentUser: User;
  topicForm: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit() {
      this.topicForm = this.formBuilder.group({
          topicName: ['', Validators.required],
          message: ['', Validators.required]
      });
  }

  get f() { return this.topicForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.topicForm.invalid) {
          return;
      }

      this.loading = true;

      this.TopicService.createTopic(this.f.topicName.value, this.f.message.value, this.currentUser.username)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Topic created successfully', true);
                  this.router.navigate(['/topicList']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
