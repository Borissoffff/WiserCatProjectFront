import {Component, OnInit} from '@angular/core';
import {PetDto} from "../../dto/PetDto";
import {PetService} from "../../service/pet.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {FurColor} from "../../dto/FurColor";
import {Origin} from "../../dto/Origin";
import {PetTypeService} from "../../service/pet-type.service";
import {FurColorService} from "../../service/fur-color.service";
import {OriginService} from "../../service/origin.service";
import {PetType} from "../../dto/PetType";
import {PetsSorter} from "../../sorting/PetsSorter";

@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.css']
})
export class PetsTableComponent implements OnInit {

  public pets: PetDto[] = [];
  private petsCopy: PetDto[] = [];
  public userId: number | undefined;

  public petTypes: PetType[] = [];
  public furColors: FurColor[] = [];
  public origins: Origin[] = [];

  public typeForSorting: string | undefined;
  public colorForSoring: string | undefined;
  public originForSorting: string | undefined;
  public toBeSortedBy: keyof PetDto | undefined; //name or code

  public showSortingSettings: boolean = false;

  constructor(
    private petTypesService: PetTypeService,
    private furColorsService: FurColorService,
    private originService: OriginService,
    private petService: PetService,
    private petsSorter: PetsSorter,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('userId');
      this.userId = Number(userId);
    });
    this.getPetsByUserId(this.userId!);

    this.getFurColors();
    this.getPetTypes();
    this.getOrigins();
  }

  toggleSortingSettings() {
    this.showSortingSettings = !this.showSortingSettings;
  }

  public getPets(): void {
    this.petService.getPets().subscribe({
      next: (response: PetDto[]) => {
        this.pets = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public getPetsByUserId(userId: number): void {
    this.petService.getPetsByUserId(userId).subscribe({
      next: (response: PetDto[]) => {
        this.pets = response;
        this.petsCopy = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  private getFurColors(): void {
    this.furColorsService.getFurColors().subscribe({
      next: (response: FurColor[]) => {
        this.furColors = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  private getPetTypes(): void {
    this.petTypesService.getPetTypes().subscribe({
      next: (response: PetType[]) => {
        this.petTypes = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  private getOrigins(): void {
    this.originService.getOrigins().subscribe({
      next: (response: Origin[]) => {
        this.origins = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public showAllPets() : void {
    this.getPetsByUserId(this.userId!);
  }

  public sortPets(): void {
    this.pets = this.petsSorter.sort(
      this.petsCopy,
      this.typeForSorting,
      this.colorForSoring,
      this.originForSorting,
      this.toBeSortedBy
    );
  }
}
