import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcastService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  user: any;
  private subscription: Subscription;
  constructor(private broadcastService: BroadcastService) {
  }

  ngOnInit(): void {
    this.subscription = this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      console.log("login success " + JSON.stringify(payload));
      this.user = payload.idToken;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
