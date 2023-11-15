import { IsNotEmpty, IsNumber, IsString, Matches, Min } from 'class-validator';

export class CreateProdottiDto {
  @IsNumber()
  @IsNotEmpty({
    message: 'il campo è obbligatorio',
  })
  idProdotto: number;
  @IsString()
  @Matches(/^[a-z ]{3,}$/g, {
    message: 'Il nome prodotto deve essere almeno di 3 caratteri',
  })
  NomeProdotto: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'La giacenza deve essere maggiore di 0' })
  Giacenza: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'La quantità min deve essere maggiore di 0' })
  QuantitàMinimaOrdine: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'Il prezzo deve essere maggiore di 0' })
  Prezzo: number;
}
