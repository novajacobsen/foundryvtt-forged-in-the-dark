import { sheets } from "../actors";

export const registerActors = () => {
  Actors.unregisterSheet("core", ActorSheet);
  sheets.forEach((sheet) => {
    Actors.registerSheet('forged', sheet.sheet, {makeDefault: true, types: sheet.types})
  });
}