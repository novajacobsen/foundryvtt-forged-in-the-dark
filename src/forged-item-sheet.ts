import ability from "../templates/items/ability.hbs"
import klass from "../templates/items/class.hbs"
import cohort from "../templates/items/cohort.hbs"
import crew_ability from "../templates/items/crew_ability.hbs"
import crew_type from "../templates/items/crew_type.hbs"
import crew_upgrade from "../templates/items/crew_upgrade.hbs"
import faction from "../templates/items/faction.hbs"
import item from "../templates/items/item.hbs"
import simple from "../templates/items/simple.hbs"



const fetchTempleteByType = (type: string) => {
    switch (type) {
        case "background":
        case "heritage":
        case "vice":
        case "crew_reputation":
            return simple
        case "ability":
            return ability
        case "class":
            return klass
        case "cohort":
            return cohort
        case "crew_ability":
            return crew_ability
        case "crew_type":
            return crew_type
        case "crew_upgrade":
            return crew_upgrade
        case "faction":
            return faction
        case "item":
            return item
        default:
            throw new Error("unsupported type template")
    }
}

export class ForgedItemSheet extends ItemSheet<{ isGm: boolean }> {

    /** @override */
    static get defaultOptions() {
        return mergeObject(ItemSheet.defaultOptions, {
            classes: ["blades-in-the-dark", "sheet", "item"],
            width: 560,
            height: 'auto',
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /* -------------------------------------------- */

    /** @override */
    get template() {
        return fetchTempleteByType(this.item.data.type)
    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html: JQuery): void {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;
    }

    /* -------------------------------------------- */

    /** @override */
    async getData() {
        const data = await super.getData();
        data.isGm = !!game.user?.isGM;
        return data;
    }
}
