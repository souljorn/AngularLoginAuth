import {Component, HostListener, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Define a users property to hold our user data
  users: Array<any>;
  jsonObj;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    //Get Json Object and make it usable
    this.http.get("/api/users").subscribe(data => {
      this.jsonObj =JSON.parse(JSON.stringify(data));
      this.users =JSON.parse(JSON.stringify(data));
    });
    console.log(this.jsonObj);
  }

  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(event){
    localStorage.clear();}
}
