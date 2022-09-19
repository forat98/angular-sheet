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
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      hoursPrice: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields

  onSubmit() {
    this.dbService
      .add('people', {
        name: this.registerForm.value['username'],
        password: this.registerForm.value['password'],
        hoursPrice: this.registerForm.value['hoursPrice'],
        totalPricePerWeek:0.00,
        totalHoursPerWeek:0.00

      }).subscribe((key) => {
        console.log('key: ', key);
      });

    this.router.navigateByUrl('/logIn');
  }

}
