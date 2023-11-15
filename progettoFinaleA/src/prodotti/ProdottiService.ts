import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdottiDto } from './dto/create-prodotti.dto';
import { UpdateProdottiDto } from './dto/update-prodotti.dto';
import { ProdottiEntity } from './entities/prodotti.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { NuovoOrdineOkEvent } from './eventi/nuovoOrdineOkEvent';
import { NuovoOrdineNotOkEvent } from './eventi/nuovoOrdineNotOkEvent';

@Injectable()
export class ProdottiService {
  constructor(
    @InjectRepository(ProdottiEntity)
    private prodottiRepository: Repository<ProdottiEntity>,
    @Inject('EVENT_COMMUNICATION')
    private readonly communicationClient: ClientProxy,
  ) {
    // private readonly jwtService: JwtService,
  }
  async aggiorna(
    iban: string,
    aggiornaProdotto: UpdateProdottiDto,
  ): Promise<boolean> {
    try {
      await this.prodottiRepository.update(iban, aggiornaProdotto);
      return true;
    } catch (error) {
      return false;
    }
  }

  async crea(prodottoDto: CreateProdottiDto): Promise<ProdottiEntity> {
    try {
      const nuovoProdotto = this.prodottiRepository.create(prodottoDto);
      await this.prodottiRepository.save(nuovoProdotto);

      // this.communicationClient.emit(
      //   'nuovo_cliente',
      //   new NuovoClienteEvent(nuovoContocorrente.Iban),
      // );
      return nuovoProdotto;
    } catch (error) {}
  }

  async cancella(idProdotto: number): Promise<boolean> {
    try {
      const prodottoDaEliminare = await this.prodottiRepository.findOneBy({
        idProdotto: idProdotto,
      });
      if (!prodottoDaEliminare) {
        throw new Error(`Prodotto non trovato`);
      }
      await this.prodottiRepository.remove(prodottoDaEliminare);
      return true;
    } catch (error) {
      return false;
    }
  }

  async trovaTutti(): Promise<ProdottiEntity[]> {
    return await this.prodottiRepository.find();
  }

  async trovaUno(idProdotto: number): Promise<ProdottiEntity> {
    try {
      const prodotto = await this.prodottiRepository.findOneBy({
        idProdotto: idProdotto,
      });

      if (!prodotto) {
        throw new Error(`prodotto non trovato.`);
      }

      return prodotto;
    } catch (errore) {}
  }

  async incrementaGiacenza(
    idProdotto: number,
    quantità: number,
  ): Promise<ProdottiEntity> {
    const prodotto = await this.prodottiRepository.findOneBy({
      idProdotto: idProdotto,
    });

    if (!prodotto) {
      throw new NotFoundException('Prodotto non trovato');
    }

    prodotto.Giacenza += quantità;
    return this.prodottiRepository.save(prodotto);
  }

  async decrementaGiacenza(
    idProdotto: number,
    quantità: number,
  ): Promise<ProdottiEntity> {
    const prodotto = await this.prodottiRepository.findOneBy({
      idProdotto: idProdotto,
    });

    if (quantità - (await prodotto.Giacenza) == 0) {
      this.communicationClient.emit(
        'ok_ordine',
        new NuovoOrdineOkEvent(prodotto.QuantitàMinimaOrdine),
      );
    }

    if (quantità - (await prodotto.Giacenza) > 0) {
      this.communicationClient.emit(
        'not_ordine',
        new NuovoOrdineNotOkEvent(
          prodotto.QuantitàMinimaOrdine,
          prodotto.idProdotto,
          quantità,
        ),
      );
    }

    if (!prodotto) {
      throw new NotFoundException('Prodotto non trovato');
    }

    prodotto.Giacenza -= quantità;
    return this.prodottiRepository.save(prodotto);
  }
}
