import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PeopleAdministrationComponent } from './people/people-administration/people-administration.component';
import { LoginComponent } from './login.component';
import { MsalGuard } from '@azure/msal-angular';
import { PersonComponent } from './people/person.component';
import { PersonResolverService } from './people/person-resolver.service';


const routes: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'people', 
    component: PeopleComponent, 
    canActivate : [MsalGuard],
    children: [
      {
        path: ':id',
        component: PersonComponent,
        resolve: {
          person: PersonResolverService
        }        
      }
    ]},
  { path: 'administration', component: PeopleAdministrationComponent, canActivate : [MsalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
