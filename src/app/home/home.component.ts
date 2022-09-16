import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = 'Angular';
  clock=""
  clockHandle: any;
  constructor() { }

  ngOnInit() {
    this.clockHandle = setInterval(()=>{
      this.clock = new Date().toLocaleTimeString("en-US");
    },1000);
  }

}
