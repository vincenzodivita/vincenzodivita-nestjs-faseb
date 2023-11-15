import { Module } from '@nestjs/common';
import { UtentiService } from './utenti.service';
import { UtentiController } from './utenti.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity } from './entities/login.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginEntity]),
    ConfigModule.forRoot(), //carica .ENV
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UtentiController],
  providers: [
    UtentiService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UtentiModule {}
