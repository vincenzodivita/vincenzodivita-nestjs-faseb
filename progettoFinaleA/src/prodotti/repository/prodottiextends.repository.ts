import { InjectRepository } from '@nestjs/typeorm';
import { ProdottiEntity } from '../entities/prodotti.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdottiExtensionRepository extends Repository<ProdottiEntity> {
  constructor(
    @InjectRepository(ProdottiEntity)
    repository: Repository<ProdottiEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  //Metodi aggiuntivi
}
