import * as ActionRoll from "./rolls/action-roll";
import { registerHooks } from "./hooks";
import { chat } from "./rolls/chat-roll";

registerHooks();

// Everything exported here will be available in window.forged when running in development.
export { ActionRoll, chat };
