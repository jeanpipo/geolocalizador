/// <reference path="components/jqwidgets.d.ts" />
import {Component, ViewChild} from '@angular/core';
import {jqxRatingComponent} from 'components/angular_jqxrating';

@Component({
    selector: 'my-app',
    template: `<angularRating #ratingReference (OnChange)="OnChange($event)"></angularRating><br>
               <div style="margin-top: 10px;">
                   <div style="float: left;">Rating:</div>
                   <div id="rate"></div>
               </div>`,
    styles: [`
        #jqxWidget
        {
            font-size: 13px;
            font-family: Verdana;
        }
        #rate
        {
            float: left;
        }
    `]
})

export class AppComponent  
{
    @ViewChild('ratingReference') myRating: jqxRatingComponent;

    ngAfterViewInit(): void
    {
        this.myRating.createWidget({ width: 350, height: 35 });
    }

    OnChange(event)
    {
        (<HTMLElement>document.getElementById('rate')).innerHTML = '<span>' + event.value + '</span';
    }
}
