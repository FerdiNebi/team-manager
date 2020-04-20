import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable()
export class UserService {
    cachedUser: any;
    
    constructor(private authService: MsalService, private http: HttpClient, private router: Router) {
        // register redirect call back (only for needed for loginRedirect)
        this.authService.handleRedirectCallback(() => {  
          router.navigate(['myProfile']);
        });
    }

    public tryToGetUser() {
        if (this.authService.getAccount()) {
            return this.getUser();
        }
        
        return of(null);
    }

    public getUser() {
        return this.http.get<any>(`User/loggedinuser`).pipe(tap(user => {
            this.cachedUser = user;
        }));
    }

    public getAccount () {
        return this.authService.getAccount();
    }
}