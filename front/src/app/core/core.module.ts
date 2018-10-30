import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { routing }        from './core.routing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { CoreComponent }  from './core.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicCreateComponent } from './topic-create/topic-create.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { MessageComponent } from './message/message.component';
import { NewlinePipe } from '../_helpers';

@NgModule({
    imports: [
        CommonModule,
        routing,
        MatMenuModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
    ],
    declarations: [
        CoreComponent,
        TopicListComponent,
        TopicCreateComponent,
        TopicDetailComponent,
        MessageComponent,
        NewlinePipe,
    ],
})

export class CoreModule { }
