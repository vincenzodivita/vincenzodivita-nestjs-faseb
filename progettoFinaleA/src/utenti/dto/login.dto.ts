import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: "L'indirizzo email deve essere corretto" })
  Email: string;
  @IsNotEmpty()
  @MinLength(8, { message: 'La password deve contenere almeno 8 caratteri' })
  Password: string;
}
