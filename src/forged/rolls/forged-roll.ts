export enum RollResult {
  critical,
  success,
  partial,
  failure,
}

export class ForgedRoll {
  result: RollResult;
  dice: number[];

  constructor(parms: { diceCount: number; results?: number[] }) {
    const d = new Die({
      number: parms.diceCount || 2,
    })
    d.evaluate();

    if (parms.results) {
      parms.results.forEach((r, i) => {
        d.results[i].result = r
      })
    }

    this.dice = d.values;
    d.keep(parms.diceCount ? 'kh': 'kl')    

    switch (d.total) {
      case 1:
      case 2:
      case 3:
        this.result = RollResult.failure;
        break;
      case 4:
      case 5:
        this.result = RollResult.partial;
        break;
      case 6:
        if (this.dice.indexOf(6) === this.dice.lastIndexOf(6)) {
          this.result = RollResult.success;
        } else {
          this.result = RollResult.critical;
        }
        break;
      default:
        throw new Error("Invalid roll: " + this.dice);
    }
  }
}
