import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AbstractControl,  FormBuilder,  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserResponse } from 'src/app/model/user-response';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { UserService } from 'src/app/services/user.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userResponse?: UserResponse; //getCurrentUser

  changePasswordForm: FormGroup;

  tooltipVisible = false;
  tooltipMessage ='After the password change process, you will be directed to the login page.';
  
  tooltipStyles: { [key: string]: string } = {};

  incorrectPasswordError: string = '';
  showPassword:boolean=false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private faIconLibrary:FaIconLibrary,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    faIconLibrary.addIcons(faEye, faEyeSlash);

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  

  getCurrentUser() {
    const id = this.authService.getUserId();

    this.userService.getCurrentUser(id).subscribe(
      (data) => {
        this.userResponse = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  updateConfirmPassword() {
    const newPasswordControl = this.changePasswordForm.get('newPassword');
    const confirmPasswordControl =
      this.changePasswordForm.get('confirmPassword');

    if (newPasswordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  changePassword() {
    const userId = this.authService.getUserId();
  
    this.userService.changePassword(userId, this.changePasswordForm.value).subscribe(
      data=>{
        if(data==true){
          this.router.navigateByUrl('pages-login');
          this.toast.success("Password update successfully");
          
        }else{
          this.incorrectPasswordError = "Incorrect password. Please enter the correct password.";
        }
      },
      error=>{
        this.toast.error("An Error Accoured Please try again");
      }
    );
  }


  deleteAccount(id: any) {
    this.confirmationDialogService
      .confirm(
        'Please Confirm..',
        'Are you sure delete account=>' + this.userResponse?.userName
      )
      .then((confirmed) => {
        if (confirmed) {
          this.userService.deleteUser(id).subscribe(
            (res) => {
              this.toast.success('Account deleted successfully');
              this.router.navigate(['pages-login']);
            },
            (error: HttpErrorResponse) => {
              this.toast.error('an error occurred ,try later..');
            }
          );
        }
      })
      .catch(() =>
        console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
  }

  showInfoTooltip() {
    this.tooltipVisible = true;
  }

  hideInfoTooltip() {
    this.tooltipVisible = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}

