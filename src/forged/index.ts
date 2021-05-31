import * as ActionRoll from "./rolls/action-roll";
import { registerHooks } from "./hooks";
import { chat } from "./rolls/chat-roll";

registerHooks();

///////////////////////////////////////////////////
//  Everything exported here will be available in window.forged when running in development.
///////////////////////////////////////////////////

const testRoll = (v: number, p?: ActionRoll.Position, e?: ActionRoll.Effect) => {
  p ||=  ActionRoll.Position.Risky
  e ||= ActionRoll.Effect.Limited
  return chat(new ActionRoll.Roll(v,p,e))
} 

export { ActionRoll, chat, testRoll };
