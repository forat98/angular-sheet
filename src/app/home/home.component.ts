import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = 'Angular';
  clock = ""
  clockHandle: any;
  constructor() { }
  days: any;
  dayName: any;

  ngOnInit() {
    this.clockHandle = setInterval(() => {
      this.clock = new Date().toLocaleTimeString("en-US");
    }, 1000);

    // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // const d = new Date();
    // let day = weekday[d.getDay()];
    // console.log(day);



  }



}
