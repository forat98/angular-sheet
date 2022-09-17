import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { CommonModule } from '@angular/common';
import { UserDataComponent } from './users/user-data/user-data/user-data.component';

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'people',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'password', keypath: 'password', options: { unique: true } },
      { name: 'hoursPrice', keypath: 'hoursPrice', options: { unique: false } }
    ]
  },{
    store: 'timeSheet',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'Date', keypath: 'Date', options: { unique: false } },
      { name: 'startDate', keypath: 'startDate', options: { unique: false } },
      { name: 'endDate', keypath: 'endDate', options: { unique: false } },
      { name: 'totalHours', keypath: 'totalHours', options: { unique: false } },
      { name: 'totalPrice', keypath: 'totalPrice', options: { unique: false } },
      { name: 'userId', keypath: 'userId', options: { unique: false } },
    ]
  }
  ,{
    store:'timeSheetTotalWeekly',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'userId', keypath: 'userId', options: { unique: false } },
      { name: 'totalHours', keypath: 'totalHours', options: { unique: false } },
      { name: 'totalPrice', keypath: 'totalPrice', options: { unique: false } },


    ]
  }]
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    RegisterComponent,
    UserDataComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxIndexedDBModule.forRoot(dbConfig)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
