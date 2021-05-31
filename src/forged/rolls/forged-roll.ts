import { RollResult } from "./roll-result";

export type d6 = 1 | 2 | 3 | 4 | 5 | 6;

export class ForgedRoll {
  result: RollResult;
  dice: d6[];
  total: d6;
  diceCount: number;
  constructor(diceCount: number, parms?: { results: number[] }) {
    this.diceCount = diceCount
    const d = new Die({
      number: diceCount || 2,
    });
    d.evaluate();

    if (parms) {
      parms.results.forEach((r, i) => {
        d.results[i].result = r;
      });
    }
    this.dice = d.values as d6[];
    d.keep(diceCount ? "kh" : "kl");
    this.total = d.total as d6;

    switch (this.total) {
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
    }
  }
}
