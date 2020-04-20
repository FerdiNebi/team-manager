import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    constructor(private authService: MsalService, public userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.redirectIfLoggedIn();
    }

    loginPopup = () => {
        this.authService.loginPopup({}).then(_ => {
            this.redirectIfLoggedIn();
        });
    }

    private redirectIfLoggedIn(){
        const user = this.userService.getUser();
        if (user) {
            this.router.navigate(['people']);
        }
    }
}