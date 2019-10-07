import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleService } from './people/people.service';
import { PeopleListComponent } from './people/people-list.component';
import { PeopleCreateComponent } from './people/people-create.component';
import { FeedbackService } from './feedback/feedback.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { CalendarComponent } from './shared/calendar.component';
import { StoreModule } from '@ngrx/store';
import { peopleReducer } from './store/reducers/people.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PeopleEffects } from './store/effects/people.effects';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent, 
    PeopleCreateComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OverlayModule,
    StoreModule.forRoot({people: peopleReducer}),
    EffectsModule.forRoot([PeopleEffects])
  ],
  providers: [PeopleService, FeedbackService],
  entryComponents: [PeopleListComponent, PeopleCreateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
