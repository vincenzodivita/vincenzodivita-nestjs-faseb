import { Repository } from 'typeorm';
import { ProdottiEntity } from './entities/prodotti.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProdottiEstensionRepository extends Repository<ProdottiEntity> {
  constructor(
    @InjectRepository(ProdottiEntity)
    repository: Repository<ProdottiEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
