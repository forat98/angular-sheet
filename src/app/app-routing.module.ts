import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './users/admin/admin.component';
import { UserDataComponent } from './users/user-data/user-data/user-data.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'logIn', component: LoginComponent },
  { path: 'Users', component: UsersComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'User/:id', component: UserDataComponent },
  { path: 'regester', component: RegisterComponent },
  { path: '', component: HomeComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
