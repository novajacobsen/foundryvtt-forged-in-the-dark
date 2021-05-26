export class AttributesEditor extends FormApplication {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.template = "systems/blades-in-the-dark/templates/settings/attributes.hbs";
        return options;
    }

    get title() {
        return "Test attribute Editor"
    }

    getData() {
        return {
            number: game.settings.get("blades-in-the-dark", "groupCount")
        }
    }

    async _updateObject(event, formData) {
        event.preventDefault();
        const a = formData['groups']

        await game.settings.set("blades-in-the-dark", "groupCount", a);
    }
}