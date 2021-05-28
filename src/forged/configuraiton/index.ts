import { menus } from "./menus";
import { settings } from "./settings";

export const registerSystemSettings = function () {
  console.log("Registering system settings");

  settings.forEach(setting => {
    game.settings.register("forged-in-the-dark", setting.name, setting)
  })

  menus.forEach(menu => {
    game.settings.registerMenu("forged-in-the-dark", menu.name, menu);
  })
};
