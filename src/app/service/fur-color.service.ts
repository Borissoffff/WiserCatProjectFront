import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PetDto} from "../dto/PetDto";
import {FurColor} from "../dto/FurColor";

@Injectable({
  providedIn: 'root'
})
export class FurColorService {

  constructor(private http: HttpClient) { }

  getFurColors(): Observable<FurColor[]> {
    return this.http.get<FurColor[]>("http://localhost:8080/api/furColors/");
  }
}
