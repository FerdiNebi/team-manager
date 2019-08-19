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

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent, 
    PeopleCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OverlayModule
  ],
  providers: [PeopleService, FeedbackService],
  entryComponents: [PeopleListComponent, PeopleCreateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
