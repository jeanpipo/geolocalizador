/// <reference path="components/jqwidgets.d.ts" />
import {Component, ViewChild} from '@angular/core';
import {jqxCalendarComponent} from 'components/angular_jqxcalendar';

@Component({
    selector: 'my-app',
    template: `<angularCalendar #calendarReference></angularCalendar>`
}) 

export class AppComponent  { 
    @ViewChild('calendarReference') myCalendar: jqxCalendarComponent;

    ngAfterViewInit(): void
    {
        this.myCalendar.createWidget({ width: 220, height: 220 });
    }
}
