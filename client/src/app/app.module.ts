import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import {routing, appRoutingProviders } from './app.routing';


//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {PuestoAddComponent} from './components/puesto-add/puesto-add.component';
import {UserListComponent} from './components/user-list/user-list.component';


import {RelevantesComponent} from './components/relevantes/relevantes.component';
import {RelevantelistComponent} from './components/relevante-list/relevante-list.component';
import {RelevantessedeComponent} from './components/relevantessede/relevantessede.component';
import {RelevantesedelistComponent} from './components/relevantessede-list/relevantesede-list.component';

import {PssnersComponent} from './components/pssner/pssner.component';
import {PssnerlistComponent} from './components/pssner-list/pssner-list.component';
import {PssedesComponent} from './components/pssede/pssede.component';
import {PssedelistComponent} from './components/pssede-list/pssede-list.component';

import {ProfileComponent} from './components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    PuestoAddComponent,
    UserListComponent,


      RelevantesComponent,
      RelevantelistComponent,
      PssnersComponent,
      PssnerlistComponent,
      PssedesComponent,
      PssedelistComponent,
      RelevantessedeComponent,
      RelevantesedelistComponent,

      ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    routing,
    HttpClientModule


  ],
  providers: [

  appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
