import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleListComponent } from './people/people-list.component';
import { PeopleCreateComponent } from './people/people-create.component';


const routes: Routes = [
  { path: 'people', component: PeopleListComponent},
  { path: 'people/add', component: PeopleCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
