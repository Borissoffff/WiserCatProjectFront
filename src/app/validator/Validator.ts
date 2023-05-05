import {FurColor} from "../dto/FurColor";
import {PetType} from "../dto/PetType";
import {Origin} from "../dto/Origin";

export class Validator {

  validateStringInput(
    maxInputSize: number,
    minInputSize: number,
    input: string | undefined): boolean
  {
    return !(input == undefined || input.length < minInputSize || input.length > maxInputSize || false);
  }

  validateSelectListInput(
    dataList: FurColor[] | PetType[] | Origin[],
    selectedInput: string | undefined): boolean
  {
    if (selectedInput == undefined) return false;
    console.log(selectedInput);
    console.log(dataList);
    return dataList.some((item) => item.name === selectedInput);
  }
}
