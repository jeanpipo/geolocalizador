/// <reference path="components/jqwidgets.d.ts" />
import {Component, ViewChild} from '@angular/core';
import {jqxComplexInputComponent} from 'components/angular_jqxcomplexinput';
import {jqxButtonComponent}       from 'components/angular_jqxbuttons';

@Component({
    selector: 'my-app',
    template: `<angularComplexInput #complexInputReference></angularComplexInput>
               <div style="margin-top: 20px;">
                   <angularButton #getReal (OnClick)="GetReal()" style="display: inline-block">Get real part</angularButton>
                   <angularButton #getImaginary (OnClick)="GetImaginary()" style="display: inline-block">Get imaginary part</angularButton>
               </div>`
}) 

export class AppComponent  { 
    @ViewChild('complexInputReference') myComplexInput: jqxComplexInputComponent;
    @ViewChild('getReal') getRealButton: jqxButtonComponent;
    @ViewChild('getImaginary') getImaginaryButton: jqxButtonComponent;

    ngAfterViewInit(): void
    {
        this.myComplexInput.createWidget(this.complexInputSettings);
        this.getRealButton.createWidget({ width: 150 });
        this.getImaginaryButton.createWidget({ width: 150 });
    }   
    
    GetReal()
    {
        let realPart = this.myComplexInput.getReal();
        alert("Real part is " + realPart);
    };

    GetImaginary()
    {
        let imaginaryPart = this.myComplexInput.getImaginary();
        alert("Imaginary part is " + imaginaryPart);
    };

    complexInputSettings: jqwidgets.ComplexInputOptions =
    {
        width: 250,
        height: 25,
        value: "15 + 7.2i"
    }   
}
