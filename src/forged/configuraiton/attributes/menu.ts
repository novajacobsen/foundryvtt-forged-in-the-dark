import { Attributes } from "./model";
import template from "./menu.hbs";

class AttributesEditor extends FormApplication<Attributes> {
  static get defaultOptions() {
    const options = FormApplication.defaultOptions;
    options.template = template;
    return options;
  }

  get title() {
    return "Test attribute Editor";
  }

  getData(): Attributes {
    return game.settings.get("forged-in-the-dark", "Attributes")
  }

  protected async _updateObject(
    event: Event | JQuery.Event,
    formData: { groups: string }
  ): Promise<unknown> {
    event.preventDefault();
    
    return null;
  }
}

export const menu = {
  name: "Attributes",
  label: "Configure Attributes",
  icon: "fas fa-edit",
  type: AttributesEditor,
  restricted: true,
};
