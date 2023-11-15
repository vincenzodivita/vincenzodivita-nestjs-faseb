import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ClientiService } from './clienti.service';
import { CreateClientiDto } from './dto/create-clienti.dto';
import { UpdateClientiDto } from './dto/update-clienti.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ClientiEntity } from './entities/clienti.entity';
import { Public } from 'src/decorators/public.decorator';

@UseGuards(AuthGuard)
@Controller('clienti')
export class ClientiController {
  constructor(private readonly clientiService: ClientiService) {}
  @Public()
  @Post()
  async create(@Body() cliente: ClientiEntity): Promise<ClientiEntity> {
    return await this.clientiService.crea(cliente);
  }

  @Get()
  async findAll() {
    const success = await this.clientiService.trovaTutti();
    if (success.length > 0) {
      return success;
    } else throw new NotFoundException('Nessun cliente trovato');
  }

  @Get(':CodiceCliente')
  async findOne(@Param('CodiceCliente') CodiceCliente: string) {
    const success = await this.clientiService.trovaUno(CodiceCliente);
    if (success) {
      return success;
    } else throw new NotFoundException('Nessun cliente trovato');
  }

  @Patch(':CodiceCliente')
  async update(
    @Param('CodiceCliente') CodiceCliente: string,
    @Body() updateProdottiDto: UpdateClientiDto,
  ) {
    const success: boolean = await this.clientiService.aggiorna(
      CodiceCliente,
      updateProdottiDto,
    );
    if (success) return 'Aggiornamento effettuato';
    else throw new NotFoundException('Il cliente non esiste');
  }

  @Delete(':CodiceCliente')
  async delete(@Param('CodiceCliente') CodiceCliente: string) {
    const success: boolean = await this.clientiService.cancella(CodiceCliente);
    if (success) return 'Cancellazione effettuata';
    else throw new NotFoundException('Il cliente non esiste');
  }
}
