import { PartialType } from '@nestjs/swagger';
import { CreateClientiDto } from './create-clienti.dto';

export class UpdateClientiDto extends PartialType(CreateClientiDto) {}
