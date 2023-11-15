import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseFilters,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { ProdottiService } from './ProdottiService';
import { CreateProdottiDto } from './dto/create-prodotti.dto';
import { UpdateProdottiDto } from './dto/update-prodotti.dto';
// import { CustomValidationPipe } from 'src/pipes/isNumeric.pipe';
// import { HttpExceptionFilter } from 'src/exceptionsFilters/HttpExceptionFilter';
// import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { Public } from 'src/decorators/public.decorator';
import { ProdottiEntity } from './entities/prodotti.entity';

// @UseInterceptors(LoggingInterceptor)
@Public()
@Controller('prodotti')
export class ProdottiController {
  constructor(private readonly prodottiService: ProdottiService) {}

  @Post()
  async create(@Body() prodotto: ProdottiEntity): Promise<ProdottiEntity> {
    try {
      return await this.prodottiService.crea(prodotto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const success = await this.prodottiService.trovaTutti();
      if (success.length > 0) {
        return success;
      } else throw new NotFoundException('Nessun prodotto trovato');
    } catch (error) {
      throw error;
    }
  }

  @Get(':idProdotto')
  async findOne(@Param('idProdotto') idProdotto: number) {
    try {
      const success = await this.prodottiService.trovaUno(idProdotto);
      if (success) {
        return success;
      } else throw new NotFoundException('Nessun prodotto trovato');
    } catch (error) {
      throw error;
    }
  }

  @Patch(':idProdotto')
  async update(
    @Param('idProdotto') idProdotto: string,
    @Body() updateProdottiDto: UpdateProdottiDto,
  ) {
    try {
      const success: boolean = await this.prodottiService.aggiorna(
        idProdotto,
        updateProdottiDto,
      );
      if (success) return 'Aggiornamento effettuato';
      else throw new NotFoundException('Il prodotto non esiste');
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('idProdotto') idProdotto: number) {
    try {
      const success: boolean = await this.prodottiService.cancella(idProdotto);
      if (success) return 'Cancellazione effettuata';
      else throw new NotFoundException('Il prodotto non esiste');
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/ordina/:quantity')
  async ordinaProdotto(
    @Param('id', ParseIntPipe) productId: number,
    @Param('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.prodottiService.incrementaGiacenza(productId, quantity);
  }

  @Patch(':id/vendi/:quantity')
  async vendiProdotto(
    @Param('id', ParseIntPipe) productId: number,
    @Param('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.prodottiService.decrementaGiacenza(productId, quantity);
  }
}
