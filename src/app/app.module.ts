import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SigninComponent } from './signin/signin.component';
import { HttpHandlerService } from './providers/http-handler.service';
import { UsersComponent } from './post-login/users/users.component';
import { EditUserComponent } from './post-login/edit-user/edit-user.component';

@NgModule({
    declarations: [AppComponent, SigninComponent, NavbarComponent, UsersComponent, EditUserComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
    providers: [HttpHandlerService],
    bootstrap: [AppComponent],
})
export class AppModule { }
