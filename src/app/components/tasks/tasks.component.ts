import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryRequest } from 'src/app/model/category-request';
import { TaskRequest } from 'src/app/model/task-request';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{

  createTaskForm:FormGroup;
  userId?:number;
  categoryRequest?:CategoryRequest[];

  loading=false;
  error='';
  submitted=false;

  
  constructor(private categoryService:CategoryService,
  private router:Router,private formBuilder:FormBuilder,
  private toastr:ToastrService,private taskService:TaskService,private authService:AuthenticationService){

    this.createTaskForm=this.formBuilder.group({
      title:['',Validators.required],
      limitDate:['',Validators.required],
      description:['',Validators.required],
      categoryId:[''],
      status:['',Validators.required],
      severity:['',Validators.required]

    });

  }

  get f(){
    return this.createTaskForm?.controls;
  }

  ngOnInit(): void {   
    //todo is server running check out
    this.getAllCategoriesByUserId();    

  }

  getAllCategoriesByUserId(){

  this.userId=this.authService.getUserId();
  this.categoryService.getAllCategoriesByUserId(this.userId).subscribe(data=>{
    this.categoryRequest=data;
  },(error:HttpErrorResponse)=>{
    console.log(error.message);
  });

  }

  createTask():void{
       //todo form da bos alan varda gerekli alanlari doldurun
 
          this.submitted=true;
         if(this.createTaskForm?.valid){
          const taskRequest:any=this.createTaskForm.value;
          this.loading=true;
          taskRequest.userId=this.authService.getUserId();

          this.taskService.createTask(taskRequest).subscribe(
            data=>{
              this.router.navigateByUrl('/task-list');
              this.toastr.success("Task add successfully.");
            },
            error=>{
              this.loading=false;
              this.error=error;
              this.toastr.error("An error accurred.Please try again");
            }
          );
         }else{
          this.toastr.error("Please fill in all required fields");
         }
  }

}
