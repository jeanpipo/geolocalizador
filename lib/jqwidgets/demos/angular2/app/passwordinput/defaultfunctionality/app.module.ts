import { NgModule}       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { jqxPasswordInputComponent } from 'components/angular_jqxpasswordinput';
import { jqxExpanderComponent } from 'components/angular_jqxexpander';
import { jqxButtonComponent } from 'components/angular_jqxbuttons';
import { jqxInputComponent } from 'components/angular_jqxinput';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, jqxPasswordInputComponent, jqxExpanderComponent, jqxButtonComponent, jqxInputComponent],
    bootstrap: [AppComponent]
})
export class AppModule{ }

