import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

    user: any = [];
    timeSheet: any = []
    saveData: any = [];
    totalHours: any = [];
    date: any;
    userID:any;
    startTime: any ;
    EndTime:any;
    totalHour:any;
    constructor(private dbService: NgxIndexedDBService,
      private route: ActivatedRoute) { }

    ngOnInit() {
  this.route.params.subscribe(params => {
     this.userID= params['id'];
    this.getUser(parseInt(this.userID))
   });


    }

  getUser(id:any){
  this.dbService.getByID('timeSheetTotal', 1).subscribe((res) => {
    console.log(res);
    this.totalHours=res;
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

    calculateTime(id:any,EndTime2:any){
      console.log(EndTime2)
      this.dbService.getByID('people',id).subscribe((res:any) => {
        let startDate = res['startTime'];
        const startTime = moment(startDate, "HH:mm:ss a");
        const EndTime = moment(EndTime2, "HH:mm:ss a");
        const duration = moment.duration(EndTime.diff(startTime));
        console.log(startTime,EndTime,duration)
        const hours = (duration.asHours());
        const minutes = (duration.asMinutes());
        console.log(duration)

        console.log(hours.toFixed(2),minutes)
        this.totalHour = Math.floor(duration.asHours()) + '.' +
      Math.floor(duration.minutes()) ;
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

}
