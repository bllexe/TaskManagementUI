import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './security/auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [


  { path: '',component:DashboardComponent },
  { path: 'dashboard',component:DashboardComponent},
  { path:'pages-register',component:RegisterComponent},
  { path:'categories',component:CategoriesComponent,canActivate:[AuthGuard] },
  { path: 'pages-login',component:LoginComponent},
  { path:'user-profile',component:UserProfileComponent,canActivate:[AuthGuard]},
 // { path: '**', component: PagesError404Component },
  { path: 'pages-contact', component: PagesContactComponent},
  { path:'tasks',component:TasksComponent,canActivate:[AuthGuard]},
  { path:'task-list',component:TaskListComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
