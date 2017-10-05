import { NgModule}       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { jqxChartComponent } from 'components/angular_jqxChart';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, jqxChartComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

