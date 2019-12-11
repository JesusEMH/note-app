import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import {MomentModule} from 'angular2-moment';


import { AppComponent } from './app.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from './components/register/register.component';
import {NotesComponent} from './components/notes/notes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule

  ],
  providers: [
  appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
