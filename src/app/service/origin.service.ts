import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Origin} from "../dto/Origin";

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  constructor(private http: HttpClient) { }

  getOrigins(): Observable<Origin[]> {
    return this.http.get<Origin[]>("http://localhost:8080/api/origins/");
  }
}
