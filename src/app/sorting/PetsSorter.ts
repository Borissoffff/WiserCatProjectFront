import {PetDto} from "../dto/PetDto";

export class PetsSorter {

  public sort(
    listToBeSorted: PetDto[],
    typeForSorting: string | undefined,
    colorForSoring: string | undefined,
    originForSorting: string | undefined,
    toBeSortedBy: string | undefined
  ): PetDto[] {

    // Filter by name and code
    if (toBeSortedBy != undefined) {
      listToBeSorted.sort((a: PetDto, b: PetDto) => {
        // @ts-ignore
        if (a[toBeSortedBy] < b[toBeSortedBy]) return -1;
        // @ts-ignore
        if (a[this.toBeSortedBy] > b[this.toBeSortedBy]) return 1;

        return 0;
      });
    }
    // Filter by color, type, and origin if they are selected.
    if (colorForSoring) {
      listToBeSorted = listToBeSorted.filter(
        pet => pet.furColor === colorForSoring);
    }
    if (typeForSorting) {
      listToBeSorted = listToBeSorted.filter(
        pet => pet.petType === typeForSorting);
    }
    if (originForSorting) {
      listToBeSorted = listToBeSorted.filter(
        pet => pet.origin === originForSorting);
    }
    return listToBeSorted;
  }
}
