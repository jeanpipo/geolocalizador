/// <reference path="components/jqwidgets.d.ts" />
import {Component, ViewChild} from '@angular/core';
import {jqxButtonGroupComponent} from 'components/angular_jqxbuttongroup';
import {jqxRadioButtonComponent} from 'components/angular_jqxradiobutton';

@Component({
    selector: 'my-app',
    template: `<angularButtonGroup (OnButtonclick)="ButtonGroupOnClick($event)" #buttonGroup>
                    <button style="padding:4px 16px;" id="Left">Left</button>
                    <button style="padding:4px 16px;" id= "Center">Center</button>
                    <button style="padding:4px 16px;" id= "Right">Right</button>
                </angularButtonGroup>
                <h4>Modes</h4>
                <angularRadioButton (OnChecked)="DefaltModeSelected()" #DefaultMode>Default</angularRadioButton>
                <angularRadioButton (OnChecked)="RadioModeSelected()" #RadioMode>RadioButtons</angularRadioButton>
                <angularRadioButton (OnChecked)="CheckBoxModeSelected()" #CheckBoxMode>CheckBoxes</angularRadioButton>   
                <div id="log" style="margin-top: 10px;"></div>`
})

export class AppComponent 
{
    @ViewChild('buttonGroup') myButtonGroup: jqxButtonGroupComponent;
    @ViewChild('DefaultMode') myDefaultModeRadioButton: jqxRadioButtonComponent;
    @ViewChild('RadioMode') myRadioModeRadioButton: jqxRadioButtonComponent;
    @ViewChild('CheckBoxMode') myCheckBoxModeRadioButton: jqxRadioButtonComponent;
       
    ngAfterViewInit(): void
    {
        this.myButtonGroup.createWidget({ mode: 'default', width: '300px' });
        this.myDefaultModeRadioButton.createWidget({});
        this.myRadioModeRadioButton.createWidget({});
        this.myCheckBoxModeRadioButton.createWidget({});

        this.myDefaultModeRadioButton.check();
    }

    DefaltModeSelected(): void
    {
        this.myButtonGroup.mode('default');
    }
    CheckBoxModeSelected(): void
    {
        this.myButtonGroup.mode('checkbox');
    }
    RadioModeSelected(): void
    {
        this.myButtonGroup.mode('radio');
    }
    ButtonGroupOnClick(event: any): void
    {
        let clickedButton = event.args.button;
        (<HTMLElement>document.getElementById("log")).innerHTML = "Clicked: " + clickedButton[0].id;
    }
}
