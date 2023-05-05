import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PetDto} from "../dto/PetDto";
import {UserDto} from "../dto/UserDto";
import {Login} from "../dto/Login";

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(private http: HttpClient) { }

  login(loginInfo: Login): Observable<UserDto> {
    return this.http.post<UserDto>("http://localhost:8080/api/identity/login", loginInfo);
  }
}
