import { registerHandlebars } from "./registerHandlebars";
import { registerSystemSettings } from "./registerSystemSettings";

export const registerHooks = () => {
  Hooks.once("init", registerHandlebars)
  Hooks.once("init", registerSystemSettings)
};

