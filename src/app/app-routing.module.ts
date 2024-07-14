import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LicencesComponent } from './components/licences/licences.component';
import { CustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
  {path:'licences', title:"Licences", component: LicencesComponent},
  {path:'customers', title:"Customers", component: CustomersComponent},
  {path:'*', title:"Licence Management", redirectTo:"licences"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents=[AppComponent]