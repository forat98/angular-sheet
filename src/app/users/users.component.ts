import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeSheet } from './user-data/user-data/user-data.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: any = [];
  timeSheet: TimeSheet[] = []
  date: any;
  adminForm!: FormGroup;


  constructor(private dbService: NgxIndexedDBService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.adminForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required,]],
    });

    this.dbService.getAll('people').subscribe((res) => {
      this.user = res;
    });
    this.dbService.getAll('timeSheet').subscribe((res) => {
      this.timeSheet = res as TimeSheet[];
    });


  }
  CalculteTotlas() {
    let endDate = new Date(this.adminForm.get("endDate")?.value);
    let startDate = new Date(this.adminForm.get("startDate")?.value);

    let AllTimeSheetForAllEmployee = this.timeSheet.filter(x => x.Date >= startDate && x.Date <= endDate);

    this.user.forEach((element: any) => {
      let userTimeSHeet = AllTimeSheetForAllEmployee.filter(x => x.userId == element.id)
      this.getAllHouers(userTimeSHeet, element)
      element.totalPricePerWeek = element.totalPricePerWeek.toFixed(2);
      element.totalHoursPerWeek = element.totalHoursPerWeek.toFixed(2);
    })
  }

  getAllHouers(timesheet: TimeSheet[], user: any) {
    timesheet.forEach((result) => {
      user.totalHoursPerWeek = Number(user.totalHoursPerWeek)
      user.totalPricePerWeek = Number(user.totalPricePerWeek)
      user.totalHoursPerWeek += Number(result.totalHours);
      user.totalPricePerWeek += Number(result.totalPrice);
    })

  }
  DeledtUser(id: any) {
    this.dbService.deleteByKey('people', id).subscribe((status) => {
    });
    this.dbService.deleteByKey('timeSheet', id).subscribe((status) => {
    });
  }

  viweUser(id: any, name: string) {
    this.router.navigateByUrl(`User/${id}`);
  }
  Delete(){
    let endDate = new Date(this.adminForm.get("endDate")?.value);
    let startDate = new Date(this.adminForm.get("startDate")?.value);

    let AllTimeSheetForAllEmployee_Ids = this.timeSheet.filter(x => x.Date >= startDate && x.Date <= endDate).map(c=>c.id);
    this.dbService.bulkDelete('timeSheet', AllTimeSheetForAllEmployee_Ids).subscribe(console.log)
  }
  download() {
    let DATA: any = document.getElementById('tableData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });

  }

}


