import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('login')
export class LoginEntity {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsEmail({}, { message: "L'indirizzo email deve essere corretto" })
  Email: string;
  @Column()
  @IsNotEmpty()
  @MinLength(8, { message: 'La password deve contenere almeno 8 caratteri' })
  Password: string;
}
