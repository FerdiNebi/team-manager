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
import { LoginComponent } from './login.component';
import { MsalInterceptor2 } from './custom.interceptor';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { WorkdayImportComponent } from './workday-import/workday-import.component';

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
    LoginComponent,
    WorkdayImportComponent
  ],
  imports: [
    MsalModule.forRoot({
      auth: {
        clientId: "7f691190-b6d4-42f9-996f-21c64aa7d1ad",
        authority: "https://login.microsoftonline.com/common/",
        redirectUri: environment.appUrl,
        postLogoutRedirectUri: environment.appUrl,
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true, // set to true for IE 11
      }
    }, {
      popUp: false,
      consentScopes: ["https://ferdinebievgmail.onmicrosoft.com/TeamManager/access_as_user", "profile"],
      extraQueryParameters: {},
      unprotectedResources: [],
      protectedResourceMap: [
        [environment.peopleServiceUrl, ["https://ferdinebievgmail.onmicrosoft.com/TeamManager/access_as_user"]],
        [environment.feedbackServiceUrl, ["https://ferdinebievgmail.onmicrosoft.com/TeamManager/access_as_user"]]
      ]
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OverlayModule,
    StoreModule.forRoot({ people: peopleReducer, feedback: feedbackReducer }),
    EffectsModule.forRoot([PeopleEffects, FeedbackEffects])
  ],
  providers: [PeopleService, FeedbackService, { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }, UserService],
  entryComponents: [PeopleComponent, PeopleAdministrationComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
