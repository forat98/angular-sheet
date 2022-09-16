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
      { name: 'email', keypath: 'email', options: { unique: true } }
    ]
  },{
    store: 'timeSheet',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'startDate', keypath: 'name', options: { unique: false } },
      { name: 'EndDate', keypath: 'name', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: true } }
    ]
  }
  ,{
    store:'timeSheetTotal',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'totalHours', keypath: 'name', options: { unique: false } },
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
    UserDataComponent
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
