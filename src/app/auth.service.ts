import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
              private router: Router


  ) { }

  login(email: string, password: string) {
    return this.http.post<any>(`/api/login`, { email: email, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          console.log("Print out the Token for Current user:" +currentUser.token);
          this.router.navigate(['/loginSuccess']);
        }
        console.log("login called");
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
