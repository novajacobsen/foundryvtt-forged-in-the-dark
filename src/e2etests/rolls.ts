import { ForgedRoll } from "../forged/rolls/forged-roll";
import { RollResult } from "../forged/rolls/roll-result";

export const name = "Rolls";
export const fun = (context: any) => {
  const { beforeEach, describe, it, expect } = context;

  describe("rolling a die", function () {
    it("is a failure if roll is 1-3", function () {
      let results = [3];
      let roll = new ForgedRoll(1, { results });

      expect(roll.dice).to.eql(results);
      expect(roll.result).to.equal(RollResult.failure);
    });

    it("is a partial if roll is 4-5", function () {
      let results = [5];
      let roll = new ForgedRoll(1, { results });

      expect(roll.dice).to.eql(results);
      expect(roll.result).to.equal(RollResult.partial);
    });

    it("is a success if roll is 6", function () {
      let results = [6];
      let roll = new ForgedRoll(1, { results });

      expect(roll.dice).to.eql(results);
      expect(roll.result).to.equal(RollResult.success);
    });
  });

  describe("rolling multiple dice", function () {
    it("is a failure if no die is above 3", function () {
      let results = [1, 2, 3];
      let roll = new ForgedRoll(3, { results });

      expect(roll.dice).to.eql(results);
      expect(roll.result).to.equal(RollResult.failure);
    });

    it("Is a partial success if the largest die is 4 or 5", function () {
      let results = [1, 5, 3];
      let roll = new ForgedRoll(3, { results });

      expect(roll.dice).to.eql(results);
      expect(roll.result).to.equal(RollResult.partial);
    });

    it("Is a success if there is exactly one 6 in the list", function () {
      let results = [1, 5, 6];
      let roll = new ForgedRoll(3, { results });

      expect(roll.dice).to.eql(results);
      expect(roll.result).to.equal(RollResult.success);
    });

    it("Is a critical if there is more than one 6 in the list", function () {
      let results = [6, 5, 6];
      let roll = new ForgedRoll(3, { results });

      expect(roll.dice).to.eql(results);
      expect(roll.result).to.equal(RollResult.critical);
    });
  });

  describe("rolling 0 dice", function () {
    it("rolls 2 dice", function () {
      let roll = new ForgedRoll(0);
      expect(roll.dice).to.have.lengthOf(2);
    });

    it("is a failure if any die is a 1-3", function () {
      let results = [2, 6];
      let roll = new ForgedRoll(0, { results });
      expect(roll.dice).to.eql(results);
      expect(roll.result).to.eql(RollResult.failure);
    });

    it("is a partial if no die is a 1-3, and they are not both 6", function () {
      let results = [4, 6];
      let roll = new ForgedRoll(0, { results });
      expect(roll.dice).to.eql(results);
      expect(roll.result).to.eql(RollResult.partial);
    });

    it("is a crit if both dice are 6", function () {
      let results = [6, 6];
      let roll = new ForgedRoll(0, { results });
      expect(roll.dice).to.eql(results);
      expect(roll.result).to.eql(RollResult.critical);
    });
  });
};
