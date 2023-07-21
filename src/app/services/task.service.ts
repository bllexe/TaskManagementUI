import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { TaskDto } from '../model/task-dto';
import { ApiService } from './api.service';
import { TaskResponse } from '../model/task-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private TASK_PATH="/tasks";

  constructor(private apiService:ApiService,private httpClient:HttpClient) { }

  createTask(taskRequest:any) : Observable<TaskDto>{
    return this.apiService.post(this.TASK_PATH,taskRequest).pipe(map(
      res=>{
        if(res){
          return res;
        }else{
          console.log(res);
          return {};
        }
      }
    ));

  }

  getAllTaskByUserId(userId:any):Observable<TaskResponse[]>{

   //return this.httpClient.get<TaskResponse[]>('http://localhost:8081/api/tasks/byUser/' + userId);

   return this.httpClient.get<TaskResponse[]>(environment.API_BASE_PATH+this.TASK_PATH+'byUser'+userId);

  }

  deleteTask(id:any):Observable<any>{
    return this.apiService.delete(this.TASK_PATH+'/' + id).pipe(map(
      res=>{
        if(res){
          return res;
        }else{
          console.log(res);
          return{};
        }
      }
    ));
  }

  updateTask(task:any):Observable<any>{
    return this.apiService.put(this.TASK_PATH,task).pipe(map(
      res=>{
        if(res){
          return res;
        }else{
          console.log(res);
          return {};
        }
      }
    ))
  }

  getAllTaskByCategoryName(){

    //todo

  }
  getAllTaskByStatus(){
    //todo

  }
  getAllTaskBySeverity(){
    //todo

  }
  getTaskCountByUserId(){
    //todo
  }
}
