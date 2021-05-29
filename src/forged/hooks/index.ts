import { registerHandlebars } from "./registerHandlebars";
import { registerSystemSettings } from "./registerSystemSettings";
import { registerActors } from "./registerActors";

export const registerHooks = () => {
  Hooks.once("init", registerHandlebars)
  Hooks.once("init", registerSystemSettings)
  Hooks.once("init", registerActors)
};

