import { Injectable } from '@nestjs/common';
import { CreateClientiDto } from './dto/create-clienti.dto';
import { UpdateClientiDto } from './dto/update-clienti.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientiEntity } from './entities/clienti.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientiService {
  constructor(
    @InjectRepository(ClientiEntity)
    private clientiRepository: Repository<ClientiEntity>,
  ) {}

  async aggiorna(
    iban: string,
    aggiornaCliente: UpdateClientiDto,
  ): Promise<boolean> {
    try {
      await this.clientiRepository.update(iban, aggiornaCliente);
      return true;
    } catch (error) {
      return false;
    }
  }

  async crea(clienteDto: CreateClientiDto): Promise<ClientiEntity> {
    try {
      const nuovoCliente = this.clientiRepository.create(clienteDto);
      await this.clientiRepository.save(nuovoCliente);
      return nuovoCliente;
    } catch (error) {}
  }

  async cancella(CodiceCliente: string): Promise<boolean> {
    try {
      const clienteDaEliminare = await this.clientiRepository.findOneBy({
        CodiceCliente: CodiceCliente,
      });
      if (!clienteDaEliminare) {
        throw new Error(`Cliente non trovato`);
      }
      await this.clientiRepository.remove(clienteDaEliminare);
      return true;
    } catch (error) {
      return false;
    }
  }

  async trovaTutti(): Promise<ClientiEntity[]> {
    return await this.clientiRepository.find();
  }

  async trovaUno(CodiceCliente: string): Promise<ClientiEntity> {
    try {
      const cliente = await this.clientiRepository.findOneBy({
        CodiceCliente: CodiceCliente,
      });

      if (!cliente) {
        throw new Error(`cliente non trovato.`);
      }

      return cliente;
    } catch (errore) {}
  }
}
