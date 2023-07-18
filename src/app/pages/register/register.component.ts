import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/security/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submited = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,private toastr:ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
      
    });
  }

  ngOnInit(): void {
   
    this.authenticationService.logout();
  }

  get f() {
    return this.registerForm?.controls;
  }

  register() {
    this.submited = true;
    if (this.registerForm?.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .register(this.registerForm?.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/pages-login']);
          this.toastr.success('User registered succesfully.');
          //todo bu kullanici zaten varsa ekranda bu kullanici zaten var uyarisi gosterilecek
          //todo email confirmation
          
        },
        (error) => {
          this.error = error;
          this.loading = false;
          this.toastr.error("an error occured!! try later" + error)
        }
      );
  }
}
