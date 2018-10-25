import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guards';
import { TopicCreateComponent } from './topic-create/topic-create.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

const coreRoutes: Routes = [
  { path: 'createTopic', component: TopicCreateComponent, canActivate: [AuthGuard] },
  { path: 'listTopic', component: TopicListComponent, canActivate: [AuthGuard] },
  { path: 'topic/:name', component: TopicDetailComponent, canActivate: [AuthGuard] },
];

export const routing = RouterModule.forChild(coreRoutes);
