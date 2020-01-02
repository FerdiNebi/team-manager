import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleService } from './people/people.service';
import { PeopleComponent } from './people/people.component';
import { PeopleCreateComponent } from './people/people-create/people-create.component';
import { FeedbackService } from './feedback/feedback.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { CalendarComponent } from './shared/calendar.component';
import { StoreModule } from '@ngrx/store';
import { peopleReducer } from './store/reducers/people.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PeopleEffects } from './store/effects/people.effects';
import { PeopleAdministrationComponent } from './people/people-administration/people-administration.component';
import { PeopleDeleteComponent } from './people/people-delete/people-delete.component';
import { ModalDialogComponent } from './shared/modal-dialog/modal-dialog.component';
import { PersonComponent } from './people/person.component';
import { FeedbackEffects } from './store/effects/feedback.effects';
import { feedbackReducer } from './store/reducers/feedback.reducers';
import { AddFeedbackComponent } from './feedback/add-feedback/add-feedback.component';
import { FeedbackHistoryComponent } from './feedback/feedback-history/feedback-history.component';
import { ScrollToBottomDirective } from './shared/scroll-to-bottom.directive';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PersonComponent,
    PeopleCreateComponent,
    CalendarComponent,
    PeopleAdministrationComponent,
    PeopleDeleteComponent,
    ModalDialogComponent,
    AddFeedbackComponent,
    FeedbackHistoryComponent,
    ScrollToBottomDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OverlayModule,
    StoreModule.forRoot({people: peopleReducer, feedback: feedbackReducer}),
    EffectsModule.forRoot([PeopleEffects, FeedbackEffects])
  ],
  providers: [PeopleService, FeedbackService],
  entryComponents: [PeopleComponent, PeopleAdministrationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
