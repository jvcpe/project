import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { TopicService, AlertService } from '../../_services';
import { User } from '../../_models';
import { ITopic } from '../../_models/topic';

@Component({
    templateUrl: 'topic-detail.component.html'
})

export class TopicDetailComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private TopicService: TopicService,
    private formBuilder: FormBuilder,
  ){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  messageForm: FormGroup;
  loading = false;
  submitted = false;

  currentUser: User;
  topicName: string = '';
  topic = {} as ITopic;
  errorMessage: string;

  getTopic(){
    this.TopicService.getTopic(this.topicName).subscribe(
      topic => {
        this.topic = topic
      },
      error => this.errorMessage = <any>error
    );
  }

  ngOnInit(): void{
    this.topicName = this.route.snapshot.paramMap.get('name');

    this.messageForm = this.formBuilder.group({
        message: ['', Validators.required]
    });

    this.getTopic()
  }

  onBack(): void {
    this.router.navigate(['/listTopic']);
  }

  get f() { return this.messageForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.messageForm.invalid) {
          return;
      }

      this.loading = true;
      this.TopicService.createMessage(this.topic.topicName, this.f.message.value, this.currentUser.username)
          .subscribe(
              data => {
                this.alertService.success('Message sent successfully', true);
                this.getTopic();
                this.messageForm.reset();
                this.loading = false;
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
