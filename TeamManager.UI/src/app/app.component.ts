import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { AuthError, AuthResponse } from 'msal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  user: any;
  private subscription: Subscription;
  constructor(private broadcastService: BroadcastService, private authService : MsalService) {
  }

  ngOnInit(): void {
    this.subscription = this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      console.log("login success " + JSON.stringify(payload));
      this.user = payload.idToken;
    });

    this.authService.handleRedirectCallback((redirectError: AuthError, redirectResponse: AuthResponse) => {
      if (redirectError) {
        console.error("Redirect error: ", redirectError);
        return;
      }

      console.log("Redirect success: ", redirectResponse);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
