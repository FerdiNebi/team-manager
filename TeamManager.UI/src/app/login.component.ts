import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    constructor(private authService: MsalService, public userService: UserService, private router: Router) {
    }

    loginRedirect = () => this.authService.loginRedirect({});

    loginPopup = () => {
        this.authService.loginPopup({}).then(_ => {
            this.userService.tryToGetUser().subscribe(_ => {
                this.router.navigate(['people']);
            });
        });
    }
}