import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { FormCustomerComponent } from './components/customers/form-customer/form-customer.component';
import { DirectivesComponent } from './components/directives/directives.component';
import { DetailCustomerComponent } from './components/customers/detail-customer/detail-customer.component';

const routes: Routes = [
  {path: '', redirectTo: 'customers', pathMatch: 'full'},
  {path: '', component: CustomersComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'directives', component: DirectivesComponent},
  //{path: 'customers/detailCustomer/:idCustomer', component: DetailCustomerComponent},
  {path: 'customers/addCustomer', component: FormCustomerComponent},
  {path: 'customers/editCustomer/:idCustomer', component: FormCustomerComponent},
  {path: '**', component: CustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
