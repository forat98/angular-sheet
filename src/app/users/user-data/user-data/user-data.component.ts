import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
export interface TimeSheet {
  id: number,
  Date: Date,
  startDate: Date | string,
  endDate: Date | string,
  userId: number,
  totalHours: string ,
  totalPrice:string
}
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  results: TimeSheet[] = [];
  totalHoursInweek: number = 0;
  user: any;
  date: any;
  userID: any;
  startTime: any;
  EndTime: any;
  totalHour: any;
  nameUser!:string;
  counter: number = 0;
  enableButton!: string|number;
  totalHoursPrice = 0;
  AllTimeSheetsPerWeek: TimeSheet[] = [];
  constructor(private dbService: NgxIndexedDBService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const date = moment()
    this.enableButton = date.format("YYYY-MM-DD")

    this.route.params.subscribe(params => {
      this.userID = params['id'];
      this.getUser(this.userID)
      this.dbService.getAll("timeSheet").subscribe(res => {
        console.log(res);
        if (res)
          this.results = (res as TimeSheet[]).filter(x => x.userId == this.userID);
          let startDate = new Date("2022-09-17");
          let endDate = new Date("2022-09-24");
        this.AllTimeSheetsPerWeek =  (res as TimeSheet[]).filter(x => x.Date <= endDate && x.Date >= startDate)
        console.log("AllTimeSheetsPerWeek:", this.AllTimeSheetsPerWeek)
        console.log("results: ", this.results);
      })
    });
  }


  getUser(id: any) {
    this.dbService.getByID('people', Number(id)).subscribe((res) => {
      this.user = res;
console.log("user:", this.user)
    });

  }


  getDatOfWeek() {
    const fromDate = moment();
    const toDate = moment().add(6, 'days');
    console.log (fromDate,toDate);
    const enumerateDaysBetweenDates = (startDate: any, endDate: any) => {
      console.log(startDate, endDate);
      let foundDates = [];
      while (endDate.isSameOrAfter(startDate)) {

        foundDates.push(JSON.parse(JSON.stringify(startDate)));
        startDate.add(1, "days");
      }
      return foundDates;
    };

    let days = enumerateDaysBetweenDates(fromDate, toDate);

    for (let i = 0; i < days.length; i++) {
      let newSheet: TimeSheet = {} as TimeSheet;
      newSheet.userId = Number(this.userID)
      newSheet.startDate = "";
      newSheet.endDate = "";
      newSheet.totalHours = "0.00";
      newSheet.totalPrice = "0.00";
      this.results.push(newSheet);
      this.results[i].Date = new Date(days[i]);
    }
    console.log(this.results);
    this.dbService.bulkAdd("timeSheet", this.results).subscribe(res => {
      console.log(res);
      this.dbService.getAll('timeSheet').subscribe(res => {
        this.results = (res as TimeSheet[]).filter(x => x.userId == this.userID)
        console.log(this.results);
      })
    })
  }


  getSartTime(item: TimeSheet) {
    if (!item.startDate) {
      item.startDate = new Date();
      this.dbService
        .update('timeSheet', item)
        .subscribe((storeData: any) => {
          console.log(storeData)
        });
    }
  }
  getEndTime(item: TimeSheet) {
    if (!item.endDate) {
      item.endDate = new Date()
      let diff = this.getDataDiff( item , new Date(item.startDate), new Date(item.endDate))
      item.totalHours =  (diff.hour + (diff.minute/60)).toFixed(2)
      item.totalPrice = (Number(item.totalHours) * Number(this.user.hoursPrice)).toFixed(2)
      this.dbService
        .update('timeSheet', item)
        .subscribe((storeData: any) => {
        });
    }
  }

  diff_hours(end: any, startTime: any, item: TimeSheet) {
    const start = moment(startTime, "HH:mm a");
    const ende = moment(end, "HH:mm a");
    const duration = moment.duration(ende.diff(startTime));
    console.log(duration)
    const hours = (duration.asHours());
    const minutes = (duration.asMinutes());
    this.totalHour = Math.floor(duration.asHours()) + ':' +
      Math.floor(duration.minutes());
    console.log("this.totalHour",this.totalHour)



  }




getDataDiff(item:TimeSheet,startDate:Date, endDate:Date) {
  var diff = endDate.getTime() - startDate.getTime();
  var days = Math.floor(diff / (60 * 60 * 24 * 1000));
  var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
  var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
  return {  hour: hours, minute: minutes };
}

  getAllHouers() {
   this.results.forEach((result) => {
    this.totalHoursInweek += Number(result.totalHours);
    this.totalHoursPrice += Number(result.totalPrice);
   })


      }



}
