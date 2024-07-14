import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CreateLicenceComponent } from './components/create-licence/create-licence.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InputMaskModule } from 'primeng/inputmask';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {CheckboxModule} from 'primeng/checkbox';
import { LicencesComponent } from './components/licences/licences.component';
import { DropdownModule } from 'primeng/dropdown';
import { CustomersComponent } from './components/customers/customers.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    CreateLicenceComponent,
    NavbarComponent,
    routingComponents,
    LicencesComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    FormsModule,
    DynamicDialogModule,
    InputTextModule,
    BrowserAnimationsModule,
    TableModule,
    InputMaskModule,
    AutoCompleteModule,
    InputNumberModule,
    CalendarModule,
    MessagesModule,
    ProgressSpinnerModule,
    CheckboxModule,
    DropdownModule,
    ConfirmDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
