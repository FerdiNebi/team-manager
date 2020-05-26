import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { AuthError, AuthResponse, Logger, CryptoUtils } from 'msal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  user: any;
  isIframe = false;
  private subscriptions: Subscription[] = [];
  constructor(private broadcastService: BroadcastService, private authService: MsalService) {
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.subscriptions.push(this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      if (payload) {
        this.user = payload.idToken;
      }
    }));

    this.subscriptions.push(this.broadcastService.subscribe('msal:loginFailure', () => {
      this.authService.loginRedirect();
      console.log("Redirect after login failure.");
    }));

    this.authService.handleRedirectCallback((redirectError: AuthError, redirectResponse: AuthResponse) => {
      if (redirectError) {
        console.error("Redirect error: ", redirectError);
        return;
      }

      console.log("Redirect success: ", redirectResponse);
    });

    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      // Uncomment to log authentication status
      // console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.subscriptions.length; i++) {
      const subscription = this.subscriptions[i];
      subscription.unsubscribe();
    }
  }
}
