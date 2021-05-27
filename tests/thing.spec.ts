import { expect } from "chai"
import {add2} from "../src/thing"

describe('add2', () => {
    it('equals 2 + 2', () => {
        expect(add2(2)).to.eq(4)
    });
});

