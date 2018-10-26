import { Component, Input, OnInit } from '@angular/core';

import { IMessage } from '../../_models/message';

@Component({
    selector: 'message',
    templateUrl: 'message.component.html'
})

export class MessageComponent implements OnInit {

  @Input()
  message: IMessage;

  log(): void{
    console.log(JSON.stringify(this.message));
  }

  ngOnInit(){
    this.log();
  }

  constructor(){}
}
