import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm!: FormGroup;
  notLogIn: boolean = false;
  constructor(
    private dbService: NgxIndexedDBService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }
  onLogin() {
    this.dbService.getAll('people').subscribe((res) => {
      res.find((obj: any) => {
        if(obj.name==this.logInForm.value['username'] && this.logInForm.value['username']!=='admin'){
           this.router.navigateByUrl(`User/${obj.id}`);
        };
        if(this.logInForm.value['username'] === 'admin'){
          this.router.navigateByUrl('/Users');
        }
        if (obj['name'] == this.logInForm.value['username'] == true) {
        }

        else
          this.notLogIn = true;

      })
    })


  }

}
