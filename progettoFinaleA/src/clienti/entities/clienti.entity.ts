import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ClientiEntity {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  @Length(5, 5, { message: 'Il CodiceCliente deve essere lungo 5 caratteri' })
  @Matches(/^[A-Z]+$/, {
    message: 'Il CodiceCliente deve contenere solo caratteri maiuscoli',
  })
  CodiceCliente: string;
  @Column()
  @IsNotEmpty()
  Nome: string;
  @Column()
  @IsNotEmpty()
  DataDiNascita: string;
  @Column()
  @IsNotEmpty()
  @IsEmail({}, { message: "L'indirizzo email deve essere corretto" })
  Email: string;
  @Column()
  @IsNotEmpty()
  @MinLength(8, { message: 'La password deve contenere almeno 8 caratteri' })
  Password: string;
}
