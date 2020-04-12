import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';

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
import { UserService } from './user.service';
import { LoginComponent } from './login.component';
import { Logger } from 'msal';
import { MsalInterceptor2 } from './custom.interceptor';

export function baseUri() {
  return window.location.protocol + '//' + window.location.host + '/';
}

export function loggerCallback(level, message) {
  console.log('client logging' + message);
}

const protectedResourceMap = new Map<string, string[]>();
protectedResourceMap.set("http://localhost:5005/p/people", ["api://7f691190-b6d4-42f9-996f-21c64aa7d1ad/access_as_user", "user.read", "openid", "profile"]);
protectedResourceMap.set("http://localhost:5005/f/feedback", ["api://7f691190-b6d4-42f9-996f-21c64aa7d1ad/access_as_user", "user.read", "openid", "profile"]);
// protectedResourceMap.set("https://localhost:5001/WeatherForecast", ["api://7f691190-b6d4-42f9-996f-21c64aa7d1ad/access_as_user", "user.read", "openid", "profile"]);

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
    ScrollToBottomDirective,
    LoginComponent
  ],
  imports: [
    MsalModule.forRoot({
      auth: {
        clientId: "7f691190-b6d4-42f9-996f-21c64aa7d1ad",
        authority: "https://login.microsoftonline.com/1e2cf074-7a96-45fd-8bab-6638448666b3/",
        validateAuthority: true,
        redirectUri: "http://localhost:4200/",
        postLogoutRedirectUri: "http://localhost:4200/",
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true, // set to true for IE 11
      },
      framework: {
        protectedResourceMap: protectedResourceMap
      },
      system: {
        logger: new Logger(loggerCallback)
      }
    }, {
      popUp: true,
      consentScopes: ["user.read", "openid", "profile"],
      extraQueryParameters: {}
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OverlayModule,
    StoreModule.forRoot({ people: peopleReducer, feedback: feedbackReducer }),
    EffectsModule.forRoot([PeopleEffects, FeedbackEffects])
  ],
  providers: [PeopleService, FeedbackService, { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor2, multi: true }, UserService],
  entryComponents: [PeopleComponent, PeopleAdministrationComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
