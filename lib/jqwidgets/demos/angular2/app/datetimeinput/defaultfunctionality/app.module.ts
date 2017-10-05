import { NgModule}       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { jqxDateTimeInputComponent } from 'components/angular_jqxdatetimeinput';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, jqxDateTimeInputComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

