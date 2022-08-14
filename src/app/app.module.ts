import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationMessageComponent } from './components/shared/confirmation-message/confirmation-message.component';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './components/customers/customers.component';
import { BodySidenavComponent } from './components/sidenav/body-sidenav/body-sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { FormCustomerComponent } from './components/customers/form-customer/form-customer.component';
import { DirectivesComponent } from './components/directives/directives.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { DetailCustomerComponent } from './components/customers/detail-customer/detail-customer.component';
import { DialogDetailCustomerComponent } from './components/customers/dialog-detail-customer/dialog-detail-customer.component';

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationMessageComponent,
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    CustomersComponent,
    BodySidenavComponent,
    FormCustomerComponent,
    DirectivesComponent,
    DetailCustomerComponent,
    DialogDetailCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
