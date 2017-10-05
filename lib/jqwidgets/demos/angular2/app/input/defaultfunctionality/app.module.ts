import { NgModule}       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { jqxInputComponent } from 'components/angular_jqxinput';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, jqxInputComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

