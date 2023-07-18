import { Injectable } from '@angular/core';
import { UserDto } from '../model/user-dto';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../security/authentication.service';
import { UserResponse } from '../model/user-response';
import { environment } from 'src/environments/environment';
import { ChangePasswordRequest } from '../model/change-password-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private USER_PATH = '/users';


  constructor(private apiService: ApiService,private authService:AuthenticationService,
    private httpClient:HttpClient) {}

  // getAll(): Observable<any> {
  //   return this.apiService.get(this.USER_PATH).pipe(
  //     map((res) => {
  //       if (res) {
  //         return res;
  //       } else {
  //         console.log(res);
  //         return {};
  //       }
  //     })
  //   );
  // }

  getCurrentUser(id:any): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>('http://localhost:8081/api/users/' + id);
      
  }

  // createUser(userDto: HttpParams | undefined): Observable<UserDto> {
  //   return this.apiService.post(this.USER_PATH,userDto).pipe(map(
  //     res=>{
  //       if(res){
  //         return res;
  //       }else{
  //         console.log(res);
  //         return {};
  //       }
  //     }
  //   ));
  // }

  changePassword(id:number,changePasswordRequest:any):Observable<any>{
    return this.apiService.put(this.USER_PATH +'/password/' + id,changePasswordRequest).pipe(map(
      res=>{
        if(res){
          return true;
        }else{
          return {};
        }
      }
    ))
  }


  deleteUser(id:number) : Observable<any>{
    return this.apiService.delete(this.USER_PATH +'/'+id).pipe(map(
      res =>{
        if(res){
          return res;
        }else{
          console.log(res);
          return {};
        }
      }
    ));
  }
}