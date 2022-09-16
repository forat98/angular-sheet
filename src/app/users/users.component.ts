import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: any = [];
  timeSheet: any = []
  saveData: any = [];
  totalHours: any = [];
  date: any;
  startTime: any ;
  EndTime:any;
  totalHour:any;
  constructor(private dbService: NgxIndexedDBService,
    private router: Router, ) { }

  ngOnInit() {

    this.dbService.getAll('people').subscribe((res) => {
      this.user = res;
    });
    this.dbService.getAll('timeSheet').subscribe((res) => {

      this.timeSheet = res;
    });
    this.dbService.getAll('timeSheetTotal').subscribe((res) => {
      this.totalHours = res;
    });

  }
  setTimeEnd(id: any) {
    this.dbService
      .update('timeSheet', {
        id: id,
        endTime: new Date().toLocaleTimeString("en-US"),
        totalHours: this.calculateTime(id,this.EndTime)
      })
      .subscribe((storeData:any) => {
        console.log(storeData);
        this.EndTime= storeData['endTime'];
        this.calculateTime(id,storeData['endTime']);

      });
  }

  DeledtUser(id: any){
    this.dbService.deleteByKey('people', id).subscribe((status) => {
    });
    this.dbService.deleteByKey('timeSheet', id).subscribe((status) => {
    });
  }

  calculateTime(id:any,EndTime2:any){
    this.dbService.getByID('people',id).subscribe((res:any) => {
      let startDate = res['startTime'];



    var ms = moment(EndTime2,"HH:mm:ss").diff(moment(startDate,"HH:mm:ss"));
    var d = moment.duration(ms);
    this.totalHour = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
console.log(this.totalHour)

    this.dbService
    .update('timeSheetTotal', {
      id: id,
      totalHours:  this.totalHour,
      totalHoursPrice: (this.totalHour*14).toFixed(2),

    })
    .subscribe((storeData:any) => {
      console.log(storeData);

    });
    });

  }

  viweUser(id:any){
    this.router.navigateByUrl(`User/:${id}`);

  }


}


