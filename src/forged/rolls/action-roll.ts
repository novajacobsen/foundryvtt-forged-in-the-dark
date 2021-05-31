import { ForgedRoll } from "./forged-roll";
import { RollResult } from "./roll-result";

export interface Binding {
  description: string;
  result: string;
  position: string;
  effect: string;
  dice: { cls: string; number: number }[];
  diceCount: number;
}

export class Roll {
  private description: string;
  private result: RollResult;
  private position: string;
  private effect: string;
  private dice: { cls: string; number: number }[];
  private diceCount: number;

  get binding(): Binding {
    return {
      description: this.description,
      result: this.result,
      position: this.position,
      effect: this.effect,
      dice: this.dice.sort((a, b) => b.number - a.number),
      diceCount: this.diceCount,
    };
  }
  constructor(_roll: number | ForgedRoll, position: Position, effect: Effect) {
    let roll: ForgedRoll;
    if (typeof _roll === "number") {
      roll = new ForgedRoll(_roll);
    } else {
      roll = _roll;
    }
    this.result = roll.result;
    this.diceCount = roll.diceCount;
    this.description = position.description(this.result);
    this.effect = effect;
    this.position = position.position;
    this.dice = roll.dice.map((v) => {
      let cls = "discarded";
      if (v === roll.total) {
        cls =
          roll.result === RollResult.critical
            ? "max"
            : roll.result === RollResult.failure
            ? "min"
            : "";
      }
      return { cls, number: v };
    });
  }
}

export abstract class Position {
  public static get Controlled() {
    return new Controlled();
  }
  public static get Risky() {
    return new Risky();
  }
  public static get Desperate() {
    return new Desperate();
  }
  public abstract position: string;
  protected criticalDescription: string =
    "You do it with <b>increased effect</b>.";
  protected successDescription: string = "You do it.";
  protected abstract partialDescription: string;
  protected abstract failureDescription: string;

  public description(result: RollResult) {
    switch (result) {
      case RollResult.critical:
        return this.criticalDescription;
      case RollResult.success:
        return this.successDescription;
      case RollResult.partial:
        return this.partialDescription;
      case RollResult.failure:
        return this.failureDescription;
    }
  }
}

class Controlled extends Position {
  position = "Controlled";
  partialDescription =
    "You hesitate. Withdraw and try a different approach, or else do it with a minor consequence: a <b>minor complication</b> occurs, you have <b>reduced effect</b>, you suffer <b>lesser harm</b>, you end up in a <b>risky</b> position.";
  failureDescription =
    "You falter. Press on by seizing a risky opportunity, or withdraw and try a different approach.";
}

class Risky extends Position {
  position = "Risky";
  partialDescription =
    "You do it, but there’s a consequence: you suffer <b>harm</b>, a <b>complication occurs</b>, you have <b>reduced effect</b>, you end up in a <b>desperate position</b>.";
  failureDescription =
    "Things go badly. You suffer <b>harm</b>, a <b>complication occurs</b>, you end up in a <b>desperate position</b>, you <b>lose this opportunity</b>.";
}

class Desperate extends Position {
  position = "Desperate";
  partialDescription =
    "You do it, but there’s a consequence: you suffer <b>severe harm</b>, a <b>serious complication</b> occurs, you have <b>reduced effect</b>.";
  failureDescription =
    "It’s the worst outcome. You suffer <b>severe harm</b>, a <b>serious complication</b> occurs, you <b>lose this opportunity</b> for action.";
}

export enum Effect {
  Great = "great",
  Standard = "standard",
  Limited = "limited",
}
