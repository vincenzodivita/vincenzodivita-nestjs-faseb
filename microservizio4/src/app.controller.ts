import { Controller, Get, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { NuovoOrdineOkEvent } from './eventi/nuovoOrdineOk.event';
import { EventPattern } from '@nestjs/microservices';
import { NuovoOrdineNotOkEvent } from './eventi/nuovoOrdineNotOkEvent';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('ok_ordine')
  gestistiOrdineOkEvent(data: NuovoOrdineOkEvent) {
    this.appService.gestisciOrdineOkEvent(data);
  }

  @EventPattern('not_ordine')
  gestistiOrdineNotOkEvent(data: NuovoOrdineNotOkEvent) {
    this.appService.gestisciOrdineNotOkEvent(data);
  }
}
