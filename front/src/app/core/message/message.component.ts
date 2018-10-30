import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, TopicService } from '../../_services';
import { IMessage } from '../../_models/message';
import { User } from '../../_models';

@Component({
    selector: 'message',
    templateUrl: 'message.component.html'
})

export class MessageComponent implements OnInit {

  constructor(
    private iconRegistry: MatIconRegistry,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private TopicService: TopicService,
  ) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  @Input()
  message: IMessage;

  @Input()
  topicName: string;

  @Output()
  notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  currentUser: User;
  canModify: boolean = false;
  modification: boolean = false;
  modificationForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string;
  loading: boolean;

  ngOnInit(){
    this.modificationForm = this.formBuilder.group({
        modificationMessage: [this.message.content, Validators.required],
    });

    if(this.currentUser.username == this.message.createdBy){
      this.canModify = true;
    }
  }

  toggleModification(){
    this.modification = !this.modification;
  }

  get f() { return this.modificationForm.controls; }

  onModification(){
      this.submitted = true;

      // stop here if form is invalid
      if (this.modificationForm.invalid) {
          return;
      }

      this.loading = true;
      this.TopicService.modifyMessage(this.topicName, this.f.modificationMessage.value, this.message._id)
          .subscribe(
              data => {
                this.alertService.success('Message modified successfully', true);
                this.loading = false;
                let reload = true;
                this.notify.emit(reload);
                this.toggleModification();
                console.log(reload);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
