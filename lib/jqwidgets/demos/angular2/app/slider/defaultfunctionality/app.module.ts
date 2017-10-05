import { NgModule}       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { jqxSliderComponent } from 'components/angular_jqxslider';
import { jqxCheckBoxComponent } from 'components/angular_jqxcheckbox';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, jqxSliderComponent, jqxCheckBoxComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

