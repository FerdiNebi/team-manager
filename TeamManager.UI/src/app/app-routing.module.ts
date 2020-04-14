import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PeopleAdministrationComponent } from './people/people-administration/people-administration.component';
import { LoginComponent } from './login.component';
import { MsalGuard } from '@azure/msal-angular';


const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'people', component: PeopleComponent, canActivate : [MsalGuard]},
  { path: 'administration', component: PeopleAdministrationComponent, canActivate : [MsalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
