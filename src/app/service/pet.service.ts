import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PetDto} from "../dto/PetDto";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl = "http://localhost:8080/api/pets/";

  constructor(private http: HttpClient) {}

    getPets(): Observable<PetDto[]> {
      return this.http.get<PetDto[]>(this.baseUrl);
    }

    getPetsByUserId(id: number): Observable<PetDto[]> {
      return this.http.get<PetDto[]>(this.baseUrl + "users/" + id);
    }

    getPet(id: number): Observable<PetDto> {
      return this.http.get<PetDto>(this.baseUrl + id);
    }

    savePet(pet: PetDto): Observable<PetDto> {
      return this.http.post<PetDto>(this.baseUrl, pet);
    }

    updatePet(pet: PetDto): Observable<PetDto> {
      return this.http.put<PetDto>(this.baseUrl, pet);
    }

    deletePet(id: number): Observable<void> {
      return this.http.delete<void>(this.baseUrl + id)
    }
}
