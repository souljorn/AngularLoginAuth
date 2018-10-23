import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {AuthenticationService} from "../auth.service";
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  Login ={
    email:'',
    password:''
  };

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {

  }

  //Call to the Login Rest API to get a Token
  loginUser(form: NgForm) {
    console.log(form.value);

    this.authenticationService.login(form.value.email, form.value.password).pipe(first())
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );

    const req = this.http.post('api/login', {
      email: form.value.email,
      password: form.value.password
    })
      .subscribe(
        res => {
          console.log(res);
          alert(JSON.stringify(res));
        },
        err => {
          console.log("Error occured");
        }
      );
  }

}


