import {Component, Input, OnInit} from '@angular/core';
import {PetTypeService} from "../../service/pet-type.service";
import {FurColorService} from "../../service/fur-color.service";
import {PetType} from "../../dto/PetType";
import {FurColor} from "../../dto/FurColor";
import {HttpErrorResponse} from "@angular/common/http";
import {Validator} from "../../validator/Validator"
import {PetDto} from "../../dto/PetDto";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {PetService} from "../../service/pet.service";
import {OriginService} from "../../service/origin.service";
import {Origin} from "../../dto/Origin";

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  @Input() warningText: string  = "";

  public editingMode: boolean = false;

  public userId: number | undefined;
  public petId: number = 0;   // Will be only used if component in "edit pet mode";

  public pet: PetDto | undefined; // Will be only used if component in "edit pet mode";
  public petTypes: PetType[] = [];
  public furColors: FurColor[] = [];
  public origins: Origin[] = [];

  public name: string | undefined;
  public code: string | undefined;
  public selectedType: string | undefined;
  public selectedColor: string | undefined;
  public selectedOrigin: string | undefined;

  constructor(
    private petTypesService: PetTypeService,
    private furColorsService: FurColorService,
    private originService: OriginService,
    private petService: PetService,
    private validator: Validator,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {

    //getting userId
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('userId');
      this.userId = Number(userId);
    });

    //getting petId
    this.route.paramMap.subscribe((params) => {
      const petId = params.get('petId');
      this.petId = Number(petId);
    });

    // if petId presents turn component into editing mode
    this.editingMode = this.petId != 0;

    if (this.editingMode) {
      this.getPetById(this.petId);
    }

    this.getFurColors();
    this.getPetTypes();
    this.getOrigins();
  }

  private getPetById(id: number): void {
    this.petService.getPet(id).subscribe({
      next: (response: PetDto) => {
        this.pet = response;

        //setting the values to display them in the form fields
        this.selectedType = response.petType;
        this.selectedColor = response.furColor;
        this.selectedOrigin = response.origin;
        this.name = response.name;
        this.code = response.code;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
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

  public async savePet() : Promise<void> {
    // Validate input fields
    if (
      this.validator.validateStringInput(64, 1, this.name) &&
      this.validator.validateStringInput(10, 1, this.code) &&
      this.validator.validateSelectListInput(this.furColors, this.selectedColor) &&
      this.validator.validateSelectListInput(this.petTypes, this.selectedType) &&
      this.validator.validateSelectListInput(this.origins, this.selectedOrigin)
    ) {
      const pet: PetDto = {
        name: this.name!,
        code: this.code!,
        petType: this.selectedType!,
        furColor: this.selectedColor!,
        origin: this.selectedOrigin!,
        userId: this.userId
      }
      if (this.editingMode) {
        pet.id = this.pet!.id;
      }

      this.petService.savePet(pet).subscribe(() => {
          // After successfully saving the pet, navigate and reload
          const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'merge',
            onSameUrlNavigation: 'reload'
          };
          this.router.navigate(["Pets", this.userId], navigationExtras);
        }
      );
    } else {
      this.warningText = "Bad inputs";
      return;
    }
  }
}
