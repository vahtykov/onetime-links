import { IsNotEmpty, Length, Matches } from 'class-validator';
import { ALLOWED_VALUE_SYMBOLS, ALLOWED_LINK_SYMBOLS } from './constants';

export class CreateLinkDto {
  @IsNotEmpty()
  @Length(3, 255)
  @Matches(ALLOWED_VALUE_SYMBOLS)
  value: string;
}

export class GetLinkDto {
  @IsNotEmpty()
  @Matches(ALLOWED_LINK_SYMBOLS)
  linkValue: string;
}
