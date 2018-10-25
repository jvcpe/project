import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '../../_services';
import { User } from '../../_models';
import { ITopic } from '../../_models/topic';

@Component({
    templateUrl: 'topic-detail.component.html'
})

export class TopicDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private TopicService: TopicService,
  ){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  currentUser: User;
  topicName: string = '';
  topic: ITopic;
  errorMessage: string;

  ngOnInit(): void{
    this.topicName = this.route.snapshot.paramMap.get('name');

    this.TopicService.getTopic(this.topicName).subscribe(
      topic => {
        this.topic = topic
      },
      error => this.errorMessage = <any>error
    );
  }

  onBack(): void {
    this.router.navigate(['/listTopic']);
  }
}
