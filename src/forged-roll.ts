export enum RollResult {
  critical,
  success,
  partial,
  failure
}

export class ForgedRoll {
  result: RollResult
  roll: number[]

  constructor(dice: number) {
    const r = new Roll(dice === 0 ? '2d6kl' : `${dice}d6kh`)
    r.roll()

    this.roll = r.dice[0].results.map(d => d.result)

    switch (r.results[0]) {
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
        if (this.roll.filter(x => x === 6).length >= 2) {
          this.result = RollResult.critical;
        } else {
          this.result = RollResult.success;
        }
        break;
      default:
        throw new Error('Invalid roll: ' + this.roll);
    }
  }
}
