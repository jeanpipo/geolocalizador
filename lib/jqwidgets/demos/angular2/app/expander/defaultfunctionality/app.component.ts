/// <reference path="components/jqwidgets.d.ts" />
import {Component, ViewChild} from '@angular/core';
import {jqxExpanderComponent} from 'components/angular_jqxexpander';

@Component({
    selector: 'my-app',
    templateUrl: `app/expander/defaultfunctionality/app.component.htm`
})

export class AppComponent  
{ 
    @ViewChild('expanderReference') myExpander: jqxExpanderComponent;

    ngAfterViewInit(): void
    {
        this.myExpander.createWidget({ width: '350px' }); 
    }   
}
