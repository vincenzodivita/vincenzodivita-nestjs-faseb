import { Module } from '@nestjs/common';
import { ClientiService } from './clienti.service';
import { ClientiController } from './clienti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientiEntity } from './entities/clienti.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientiEntity])],
  controllers: [ClientiController],
  providers: [ClientiService],
})
export class ClientiModule {}
