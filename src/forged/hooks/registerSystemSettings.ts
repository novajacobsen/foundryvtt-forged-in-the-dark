import { settings } from "../configuraiton/settings";
import { menus } from "../configuraiton/menus";

export const registerSystemSettings = () => {
  console.log("Registering system settings");

  settings.forEach((setting) => {
    game.settings.register("forged-in-the-dark", setting.name, setting);
  });

  menus.forEach((menu) => {
    game.settings.registerMenu("forged-in-the-dark", menu.name, menu);
  });
};
