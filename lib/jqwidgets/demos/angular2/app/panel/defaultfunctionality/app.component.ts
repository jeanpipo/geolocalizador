/// <reference path="components/jqwidgets.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { jqxPanelComponent } from 'components/angular_jqxpanel';
import { jqxButtonComponent } from 'components/angular_jqxbuttons';

@Component({
    selector: 'my-app',
    templateUrl: 'app/panel/defaultfunctionality/app.component.htm'
})

export class AppComponent 
{
    @ViewChild('panelSettings') myPanel: jqxPanelComponent;
    
    ngAfterViewInit(): void
    {
        this.myPanel.createWidget({ width: 350, height: 350 });
    }
}
