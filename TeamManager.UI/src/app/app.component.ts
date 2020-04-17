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
  private subscription: Subscription;
  constructor(private broadcastService: BroadcastService, private authService: MsalService) {
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.subscription = this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      console.log("login success");
      this.user = payload.idToken;
    });

    this.authService.handleRedirectCallback((redirectError: AuthError, redirectResponse: AuthResponse) => {
      if (redirectError) {
        console.error("Redirect error: ", redirectError);
        return;
      }

      console.log("Redirect success: ", redirectResponse);
    });

    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
