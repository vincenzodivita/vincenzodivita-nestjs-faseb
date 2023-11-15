import { PartialType } from '@nestjs/swagger';
import { CreateProdottiDto } from './create-prodotti.dto';

export class UpdateProdottiDto extends PartialType(CreateProdottiDto) {}
