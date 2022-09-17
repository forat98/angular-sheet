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
  results: any = [];

  date: any;
  startTime: any;
  EndTime: any;
  totalHour: any;
  constructor(private dbService: NgxIndexedDBService,
    private router: Router,) { }

  ngOnInit() {
    this.dbService.getAll('people').subscribe((res) => {
      this.user = res;
    });
    this.dbService.getAll('timeSheet').subscribe((res) => {
      this.timeSheet = res;
    });


  }

  DeledtUser(id: any) {
    this.dbService.deleteByKey('people', id).subscribe((status) => {
    });
    this.dbService.deleteByKey('timeSheet', id).subscribe((status) => {
    });
  }

  viweUser(id: any) {
    this.router.navigateByUrl(`User/${id}`);
  }

}


