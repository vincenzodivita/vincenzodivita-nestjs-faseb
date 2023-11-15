import { Injectable } from '@nestjs/common';
import { ClientiEntity } from './entities/clienti.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientiRepository extends Repository<ClientiEntity> {
  constructor(
    @InjectRepository(ClientiEntity)
    repository: Repository<ClientiEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
