import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';

import { DateService } from './date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';

  dates: Date[];

  dateWidth: number;

  isScrollable = true;

  constructor(private dateService: DateService){}

  ngOnInit() {
    this.dates = this.dateService.dates;
  }

  ngAfterViewInit() {
    this.dateWidth = $('#date').width();
    $('.days-otw, .calendar').scrollLeft(this.dateWidth);

    // $('.vert-scroll').on('scroll touchmove mousewheel', function(e){
    //   console.log("this thing scrolled");
    //   e.preventDefault();
    //   e.stopPropagation();
    //   return false;
    // })
  }

  onResize(){
    this.dateWidth = $('#date').width();
    $('.days-otw, .calendar').scrollLeft(this.dateWidth);
  }

  backDay(){
    if (this.isScrollable){
      this.dateService.addDay('back');
      $('.days-otw, .calendar').scrollLeft(this.dateWidth*2);
      $('.days-otw, .calendar').animate({scrollLeft: this.dateWidth}, 350);
      this.isScrollable = false;
      setTimeout(() => {
        this.isScrollable = true;
      }, 355);
    }
    
  }

  fwdDay(){
    if (this.isScrollable){
      this.dateService.addDay('fwd');
    $('.days-otw, .calendar').scrollLeft(0);
    $('.days-otw, .calendar').animate({scrollLeft: '+=' + this.dateWidth}, 350);
    this.isScrollable = false;
      setTimeout(() => {
        this.isScrollable = true;
      }, 355);
    }
    
  }

  keepScroll(){
    $('.vert-scroll').scrollLeft(0);
  }


}
