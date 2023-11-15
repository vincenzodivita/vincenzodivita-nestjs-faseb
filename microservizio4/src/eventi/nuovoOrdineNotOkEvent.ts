export class NuovoOrdineNotOkEvent {
  constructor(
    public readonly QuantitàMinima: number,
    public readonly idProdotto: number,
    public readonly quantità: number,
  ) {}
}
