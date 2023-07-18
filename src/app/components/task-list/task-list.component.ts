import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskRequest } from 'src/app/model/task-request';
import { TaskResponse } from 'src/app/model/task-response';
import { UpdateTaskRequest } from 'src/app/model/update-task-request';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{

  userId?:string;
  taskResponse?:TaskResponse[]; //getAllTaskByUserId

  editTask?:TaskRequest;


  constructor(private authService:AuthenticationService,private toastr:ToastrService,
              private taskService:TaskService,private elementRef:ElementRef,
              private confirmationDialogService:ConfirmationDialogService){}



  ngOnInit(): void {

    this.getAllTaskByUserId();
    
  }

  getAllTaskByUserId(){

    this.userId=this.authService.getUserId();
    this.taskService.getAllTaskByUserId(this.userId).subscribe(data=>{
      this.taskResponse=data;    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    })
     
  }

  deleteTask(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete')
      .then((confirmed) => {
        if (confirmed) {
          this.taskService.deleteTask(id).subscribe(
            (data) => {
              this.toastr.success('Task Deleted successfully =' + id);
              this.getAllTaskByUserId();
            },
            (error: HttpErrorResponse) => {
              this.toastr.error("An error occurred, please try again later");
            }
          );
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  UpdateTask(updateTask:UpdateTaskRequest){


    this.taskService.updateTask(updateTask).subscribe(
      (response:TaskRequest)=>{

        this.toastr.success("updated succesfully.")
        this.getAllTaskByUserId();
  
      },
      (error:HttpErrorResponse)=>{
        this.toastr.error("an error occured try later!!")
      }
    )

  }

  UpdateTaskStatus(task:UpdateTaskRequest){
   const updatedStatus=task.status==='DONE'?'ONGOING':'DONE'; 
   const taskRequest:UpdateTaskRequest={
    id:task.id,
    limitDate:task.limitDate,
    status:updatedStatus,
    severity:task.severity,
   };
   this.UpdateTask(taskRequest);
 
  }

  openUpdateModal(tasks:any){

    this.editTask=tasks;

  }

}
