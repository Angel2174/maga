import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//componentes

import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {PuestoAddComponent} from './components/puesto-add/puesto-add.component';
import {UserListComponent} from './components/user-list/user-list.component';

import {PssnersComponent } from './components/pssner/pssner.component';
import {PssnerlistComponent} from './components/pssner-list/pssner-list.component';
import {PssedesComponent} from './components/pssede/pssede.component';
import {PssedelistComponent} from './components/pssede-list/pssede-list.component';
import {RelevantesComponent} from './components/relevantes/relevantes.component';
import {RelevantelistComponent} from './components/relevante-list/relevante-list.component';
import {RelevantessedeComponent} from './components/relevantessede/relevantessede.component';
import {RelevantesedelistComponent} from './components/relevantessede-list/relevantesede-list.component';
import {ProfileComponent} from './components/profile/profile.component';

const appRoutes: Routes = [

{path: '', component: HomeComponent},
{path: 'home', component: HomeComponent},
{path: 'login', component: LoginComponent},
{path: 'registro', component: RegisterComponent},
{path: 'mis-datos', component: UserEditComponent},
{path: 'puesto-add', component: PuestoAddComponent},
{path: 'user-list/:page', component: UserListComponent},
{path: 'user-list', component: UserListComponent},
{path: 'relevantes', component: RelevantesComponent},
{path: 'relevante-list', component: RelevantelistComponent},
{path: 'pssner', component: PssnersComponent},
{path: 'pssner-list', component: PssnerlistComponent},
{path: 'pssede', component: PssedesComponent},
{path: 'pssede-list', component: PssedelistComponent},
{path: 'relevantessede', component: RelevantessedeComponent},
{path: 'relevantessede-list', component: RelevantesedelistComponent},
{path: 'perfil/:id', component: ProfileComponent},

{path: '**', component: HomeComponent}


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
