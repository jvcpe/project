import { Component, OnInit } from '@angular/core';

import { TopicService } from '../../_services/topic.service';
import { ITopic } from '../../_models/topic';
import { User } from '../../_models';

@Component({
    selector: 'topic-list',
    templateUrl: 'topic-list.component.html'
})

export class TopicListComponent implements OnInit {
  constructor(private TopicService: TopicService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  currentUser: User;
  filteredTopic: ITopic[];
  topics: ITopic[];
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter = value;
    this.filteredTopic= this.listFilter ? this.performFilter(this.listFilter) : this.topics;
  }

  ngOnInit(): void{
    this.TopicService.getTopics().subscribe(
      topics => {
        this.topics = topics,
        this.filteredTopic = this.topics
      },
      error => this.errorMessage = <any>error
    );
  }

  performFilter(listFilter: string): ITopic[]{
    listFilter = listFilter.toLocaleLowerCase();
    return this.topics.filter((topic: ITopic) =>
      topic.topicName.toLocaleLowerCase().indexOf(listFilter) != -1);
  }
}
