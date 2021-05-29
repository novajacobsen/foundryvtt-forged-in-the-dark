import template from "./sheet.hbs";

export class Sheet extends ActorSheet {
  constructor(actor: Actor, options?: any) {
    super(actor, options);
    console.log(actor, options);
  }

  static get defaultOptions() {
    let options = super.defaultOptions;
    options.template = template;

    return options;
  }
}
