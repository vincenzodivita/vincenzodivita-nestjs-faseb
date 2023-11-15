import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Matches, Min } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('prodotti')
export class ProdottiEntity {
  @PrimaryColumn()
  @IsNumber()
  @IsNotEmpty({
    message: 'il campo è obbligatorio',
  })
  @ApiProperty()
  idProdotto: number;
  @Column()
  @IsString()
  @Matches(/^[a-z ]{3,}$/g, {
    message: 'Il nome prodotto deve essere almeno di 3 caratteri',
  })
  @ApiProperty()
  NomeProdotto: string;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'La giacenza deve essere maggiore di 0' })
  @ApiProperty()
  Giacenza: number;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'La quantità min deve essere maggiore di 0' })
  @ApiProperty()
  QuantitàMinimaOrdine: number;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'Il prezzo deve essere maggiore di 0' })
  @ApiProperty()
  Prezzo: number;
}
