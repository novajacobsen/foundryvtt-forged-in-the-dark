import attributes from "../templates/settings/attributes.hbs"

export class AttributesEditor extends FormApplication<FormApplication.Options, {number: number}> {
    static get defaultOptions() {
        const options = FormApplication.defaultOptions;
        options.template = attributes
        return options;
    }

    get title() {
        return "Test attribute Editor"
    }

    getData(): {number: number} {
        return {
            number: game.settings.get("forged-in-the-dark", "groupCount") as number
        }
    }

    protected async _updateObject(event: Event, formData?: {groups: string}): Promise<unknown> {
        event.preventDefault();
        const a = formData?.groups

        await game.settings.set("forged-in-the-dark", "groupCount", a);
        return null
    }
}