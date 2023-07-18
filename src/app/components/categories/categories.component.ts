import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryDto } from 'src/app/model/category-dto';
import { CategoryRequest } from 'src/app/model/category-request';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {



  createCategoryForm:FormGroup;
  categories?:CategoryDto[];
  categoryRequest?:CategoryRequest;
  username?:string;
  userId?:number;
  

  constructor(
    private categoryService: CategoryService,private formBuilder:FormBuilder,
    private toastr: ToastrService,private router:Router,private authService:AuthenticationService
  ) {
    this.createCategoryForm=this.formBuilder.group({
      name:['',Validators.required]
     }); 
     
  }

  ngOnInit(): void {

    this.getCategoryByUserId();    
   
  }


    getCategoryByUserId() {
      
     this.userId= this.authService.getUserId();
     this.username=this.authService.getUsername();


     this.categoryService.getAllCategoriesByUserId(this.userId).subscribe(data=> {
        this.categories=data;
       
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    }

    createCategory(): void {
      const id=this.createCategoryForm.get('id')?.value;
      const name = this.createCategoryForm?.get('name')?.value;
      const userId = this.authService.getUserId();

      const categoryRequest: CategoryRequest = {
        id:id,
        name: name,
        userId: userId
      };    
    
      this.categoryService.createCategory(categoryRequest).subscribe(
        data => {        
          
          this.getCategoryByUserId();
          this.toastr.success("Category created successfully.");

        },
        error => {
          this.toastr.error("An error occurred.");
        }
      );
    }

  deleteCategory(id: any) {
   // const loggedInUser=this.authService.login();

    this.categoryService.deleteCategories(id).subscribe(
      (res) => {
        this.toastr.success('Category deleted succesfully' + id);
        this.getCategoryByUserId();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("an error occurred ,try later..");
      }
    );
  }
}

