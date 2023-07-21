import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable,map } from 'rxjs';
import { CategoryDto } from '../model/category-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private CATEGORY_PATH="/categories";

  constructor(private apiService:ApiService,private httpClient:HttpClient) { }

  createCategory(categoryRequest:any) : Observable<CategoryDto>{
    return this.apiService.post(this.CATEGORY_PATH,categoryRequest).pipe(map(
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

  getTaskById(id: HttpParams | undefined):Observable<any>{
    return this.apiService.get(this.CATEGORY_PATH,id).pipe(map(
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

  // getAllCategoriesByUserId(userId:any):Observable<any>{

  //   return this.apiService.get(this.CATEGORY_PATH +'/all',userId).pipe(map(
      
  //     res=>{
  //       if(res){
  //         return res;
  //         console.log(res);
  //       }else{
  //         console.log(res);
  //         return {};
  //       }
  //     }
  //   ));

  // }

  getAllCategoriesByUserId(userId:any):Observable<any[]>{
    //return this.httpClient.get<any[]>('http://localhost:8081/api/categories/all/' + userId);
    return this.httpClient.get<any[]>(environment.API_BASE_PATH + this.CATEGORY_PATH + '/all/' + userId);
  }

  getAllTaskByCategoriesId(categoryId: HttpParams | undefined):Observable<any>{
    return this.apiService.get(this.CATEGORY_PATH,categoryId).pipe(map(
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

  deleteCategories(id: number):Observable<any>{
    return this.apiService.delete(this.CATEGORY_PATH + '/' + id).pipe(map(
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

  getAllTaskByCategoriesForToday(id: HttpParams | undefined):Observable<any>{

    return this.apiService.get(this.CATEGORY_PATH,id).pipe(map(
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

}
