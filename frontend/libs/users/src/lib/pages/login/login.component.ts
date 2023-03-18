import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService:LocalStorageService,
    private usersService:UsersService
  ){}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.loginForm;
  }

  get getLoginForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if(this.loginForm.invalid) return;

    this.authService.login(this.getLoginForm.email.value, this.getLoginForm.password.value).subscribe({
      next: (user)=>{
        // console.log(user)
        this.authError = false;
        this.localStorageService.setToken(user.token);
        this.usersService.initAppSession()// we are running the effect for state here.
        this.router.navigateByUrl("/")
      },
      error: (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        }
      }
    })
  }

  
}


