import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PetDto} from "../dto/PetDto";
import {UserDto} from "../dto/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>("http://localhost:8080/api/users/" + id);
  }
}
