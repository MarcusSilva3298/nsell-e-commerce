import { isEmpty, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class TagsFactoryDto {
  @ValidateIf((obj) => isEmpty(obj.label) && isEmpty(obj.value))
  @IsString()
  @IsNotEmpty()
  id?: string;

  @ValidateIf((obj) => isEmpty(obj.id))
  @IsString()
  @IsNotEmpty()
  label?: string;

  @ValidateIf((obj) => isEmpty(obj.id))
  @IsString()
  @IsNotEmpty()
  value?: string;
}
