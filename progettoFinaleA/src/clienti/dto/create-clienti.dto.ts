import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateClientiDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 5, { message: 'Il CodiceCliente deve essere lungo 5 caratteri' })
  @Matches(/^[A-Z]+$/, {
    message: 'Il CodiceCliente deve contenere solo caratteri maiuscoli',
  })
  CodiceCliente: string;
  @IsNotEmpty()
  Nome: string;
  @IsNotEmpty()
  DataDiNascita: string;
  @IsNotEmpty()
  @IsEmail({}, { message: "L'indirizzo email deve essere corretto" })
  Email: string;
  @IsNotEmpty()
  @MinLength(8, { message: 'La password deve contenere almeno 8 caratteri' })
  Password: string;
}
