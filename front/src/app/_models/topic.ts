import { IMessage } from './message';

export interface ITopic {
  topicName: string;
  createdBy: string;
  createdDate: Date;
  messageList: IMessage[];
}
