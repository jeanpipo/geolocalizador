import { NgModule}       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { jqxComplexInputComponent } from 'components/angular_jqxcomplexinput';
import { jqxButtonComponent }       from 'components/angular_jqxbuttons';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, jqxComplexInputComponent, jqxButtonComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

