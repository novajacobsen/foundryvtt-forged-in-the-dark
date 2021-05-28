import { registerHandlebars } from "./registerHandlebars";

export const registerHooks = () => {
  Hooks.once("init", registerHandlebars)
};

