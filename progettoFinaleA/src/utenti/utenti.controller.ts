import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UtentiService } from './utenti.service';
import { CreateUtentiDto } from './dto/create-utenti.dto';
import { UpdateUtentiDto } from './dto/update-utenti.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('utenti')
export class UtentiController {
  constructor(private readonly utentiService: UtentiService) {}
  @Public()
  @Post()
  async create(@Body() loginDto: LoginDto) {
    return await this.utentiService.registraUtente(loginDto);
  }
  @Public()
  @Post('login')
  // @UseGuards(AuthGuard)
  async login(@Body() utente: LoginDto) {
    return await this.utentiService.loginUtente(utente);
  }
  @Public()
  @Get('utente')
  // @UseGuards(AuthGuard)
  async getUtente(email: string, password: string) {
    const user = await this.utentiService.getUtente(email, password);
    // return user;
  }
}
