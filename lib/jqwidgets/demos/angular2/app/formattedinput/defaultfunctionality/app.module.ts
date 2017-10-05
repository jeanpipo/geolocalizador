import { NgModule}       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { jqxFormattedInputComponent } from 'components/angular_jqxformattedinput';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, jqxFormattedInputComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

