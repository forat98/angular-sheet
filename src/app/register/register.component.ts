import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private dbService: NgxIndexedDBService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields

  onSubmit() {
    this.dbService
      .add('people', {
        name: this.registerForm.value['firstName'],
        email: this.registerForm.value['username'],
        pw: this.registerForm.value['password'],
        Date: new Date().toLocaleDateString("en-US"),
        startTime: new Date().toLocaleTimeString("en-US"),
      }).subscribe((key) => {
        console.log('key: ', key);
      });

    this.setTimeSheet();
    this.router.navigateByUrl('/');
  }
  setTimeSheet() {
    this.dbService
      .add('timeSheet', {
        email: this.registerForm.value['username'],
        Date: new Date().toLocaleDateString("en-US"),
        startTime: new Date().toLocaleTimeString("en-US"),
        endTime: '',
      }).subscribe((key) => {
      });

    this.dbService
      .add('timeSheetTotal', {
        name: this.registerForm.value['firstName'],
        email: this.registerForm.value['username'],
        totalHours: ''
      }).subscribe((key) => {
      });
  }
}
