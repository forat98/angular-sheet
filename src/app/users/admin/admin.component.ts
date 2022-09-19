import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TimeSheet } from '../user-data/user-data/user-data.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminForm!: FormGroup;
  AllTimeSheetsPerWeek: TimeSheet[] = [];
  results: TimeSheet[] = [];
  Total_Hours_For_All_UserInweek: number = 0;

  Total_Hours_Price_For_All_UserInweek = 0;
  constructor(private dbService: NgxIndexedDBService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required,]],
    });
  }
  onSubmit() {
    console.log(this.adminForm)
    this.dbService.getAll("timeSheet").subscribe(res => {
      console.log(res);
      let startDate =new Date( this.adminForm.value['startDate']);
      let endDate  =new Date( this.adminForm.value['endDate'])
      this.AllTimeSheetsPerWeek = (res as TimeSheet[]).filter(x => x.Date <= endDate && x.Date >= startDate)
      console.log("AllTimeSheetsPerWeek:", this.AllTimeSheetsPerWeek)
this. getAllHouers();
    })

  }

  getAllHouers() {
    this.AllTimeSheetsPerWeek.forEach((result) => {
      console.log(result);
     this.Total_Hours_For_All_UserInweek += Number(result.totalHours);
     this.Total_Hours_Price_For_All_UserInweek += Number(result.totalPrice);
    })


       }

}
