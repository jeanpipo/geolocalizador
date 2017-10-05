/// <reference path="components/jqwidgets.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { jqxFormattedInputComponent } from 'components/angular_jqxformattedinput';

@Component({
    selector: 'my-app',
    template: `<angularFormattedInput #formatedInputReference></angularFormattedInput>`
})

export class AppComponent 
{
    @ViewChild('formatedInputReference') myFormattedInput: jqxFormattedInputComponent;

    ngAfterViewInit(): void
    {
        this.myFormattedInput.createWidget(this.settings);
    }

    settings: jqwidgets.FormattedInputOptions =
    {
        width: 250,
        height: 25,
        radix: "decimal",
        value: "15",
        spinButtons: true,
        dropDown: true
    }
}
