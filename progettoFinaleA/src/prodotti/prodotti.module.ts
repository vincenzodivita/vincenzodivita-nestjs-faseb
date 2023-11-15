import { Module } from '@nestjs/common';
import { ProdottiService } from './ProdottiService';
import { ProdottiController } from './prodotti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdottiEntity } from './entities/prodotti.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProdottiEntity]),
    ClientsModule.register([
      {
        name: 'EVENT_COMMUNICATION',
        transport: Transport.TCP,
        options: { port: 3200 },
      },
    ]),
  ],
  controllers: [ProdottiController],
  providers: [
    ProdottiService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ProdottiModule {}
