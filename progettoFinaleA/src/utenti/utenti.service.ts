import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUtentiDto } from './dto/create-utenti.dto';
import { UpdateUtentiDto } from './dto/update-utenti.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginEntity } from './entities/login.entity';

@Injectable()
export class UtentiService {
  constructor(
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async loginUtente(utente: LoginDto): Promise<any> {
    const trovaUtente = await this.loginRepository.findOne({
      where: { Email: utente.Email },
    });
    if (!trovaUtente) throw new NotFoundException('Utente inesistente');
    else {
      if (utente?.Password !== trovaUtente.Password) {
        throw new UnauthorizedException();
      }
      const payload = {
        sub: trovaUtente.Email,
        username: trovaUtente.Email,
        ruoli: ['user', 'writer'],
      };
      // signAsync() genera un JWT con all'interno le proprietà custom che vogliamo.
      // Nota: Utilizzare la proprietà sub per salvare userId, in modo da essere
      // consistenti  con gli standard JWT
      // Non dimenticare di inserire il provider JwtService in AuthService.
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }

  async getUtente(email: string, password: string): Promise<any> {
    try {
      const utente: null | LoginDto = await this.loginRepository.findOne({
        where: { Email: email, Password: password },
      });
      if (!utente) {
        throw new Error('utente non esistente');
      } else {
        return utente;
      }
    } catch (error) {
      throw new Error();
    }
  }

  async registraUtente(newRegister: LoginDto): Promise<boolean | Error> {
    try {
      const nuovoUtente = this.loginRepository.create(newRegister);
      await this.loginRepository.save(nuovoUtente); //crea nel db il prodotto
      return true;
    } catch (error) {
      console.log('errore creazione conti correnti', error);
      throw new Error();
    }
  }
}
