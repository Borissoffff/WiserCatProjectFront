import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PetsTableComponent } from './components/pets-table/pets-table.component';
import {RouterModule, Routes} from "@angular/router";
import { AddPetComponent } from './components/add-pet/add-pet.component';
import {Validator} from "./validator/Validator";
import {PetsSorter} from "./sorting/PetsSorter";


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'Pets/:userId', component: PetsTableComponent },
  { path: 'Pets/:userId/addPet', component: AddPetComponent },

  //use same component for editing pet as I used for saving the pet
  { path: 'Pets/:userId/editPet/:petId', component: AddPetComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PetsTableComponent,
    AddPetComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [Validator, PetsSorter],
  bootstrap: [AppComponent]
})
export class AppModule { }
