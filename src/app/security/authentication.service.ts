import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {map} from 'rxjs/operators';
import { EventEmitter, Injectable, Output } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserDto } from "../model/user-dto";


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  public loggedUser: UserDto={};

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();
  username: Observable<string> = this.usernameSubject.asObservable();



    constructor(private http:HttpClient){}

    login(username: string, password: string):Observable<boolean> {
        return this.http.post<any>(environment.API_BASE_PATH + '/auth/login', {username, password})
          .pipe(map(data => {
  
            localStorage.setItem('currentUser',JSON.stringify(data));

            this.loggedInSubject.next(true);
            this.usernameSubject.next(data.username);
            return true;
          }));
      }

      getUsername(){
        const storedUser =localStorage.getItem('currentUser');
        if(storedUser !==null && storedUser !==undefined){
          const user=JSON.parse(storedUser);
          return user.username;
        }
      }
      getUserId(){
        const storedUser=localStorage.getItem('currentUser');
        if(storedUser !==null && storedUser !==undefined){
          const user=JSON.parse(storedUser);
          return user.userId;
        }
       }

      getLoggedUser() {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser !== null && storedUser !== undefined) {
          const user = JSON.parse(storedUser);
          return user;
        }
        return null;
      }

    register(registerData :any) {
        return this.http.post<any>(environment.API_BASE_PATH + '/auth/register', registerData)
          .pipe(map(resp => {
            return resp;
          }));
      }
    
      logout() {

        localStorage.removeItem('currentUser');
      
      }
    }  


