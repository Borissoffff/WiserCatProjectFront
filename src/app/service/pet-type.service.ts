import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PetType} from "../dto/PetType";

@Injectable({
  providedIn: 'root'
})
export class PetTypeService {

  constructor(private http: HttpClient) { }

  getPetTypes(): Observable<PetType[]> {
    return this.http.get<PetType[]>("http://localhost:8080/api/petTypes/");
  }
}
