import { NgModule}       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { jqxDropDownListComponent } from 'components/angular_jqxdropdownlist';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, jqxDropDownListComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

