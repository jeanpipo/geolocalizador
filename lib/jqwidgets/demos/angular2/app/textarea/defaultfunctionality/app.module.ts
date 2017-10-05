import { NgModule}       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { jqxTextAreaComponent } from 'components/angular_jqxtextarea';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, jqxTextAreaComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

