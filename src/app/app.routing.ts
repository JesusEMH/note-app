import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from'./components/register/register.component';
import {NotesComponent} from  './components/notes/notes.component';
import {LoadingComponent} from './components/loading/loading.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'notas', component: NotesComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'loading', component: LoadingComponent},
	{path: 'user-edit', component: UserEditComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
