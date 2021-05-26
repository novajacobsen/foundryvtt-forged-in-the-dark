import { ForgedItem } from "./forged-item";
import { ForgedItemSheet } from "./forged-item-sheet";
import { preloadHandlebarsTemplates } from "./forged-templates";


Hooks.once("init", async () => {
    CONFIG.Item.entityClass = ForgedItem;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("forged", ForgedItemSheet, { makeDefault: true });

    await preloadHandlebarsTemplates()

    // Is the value Turf side.
    Handlebars.registerHelper('is_turf_side', function (this: Handlebars.TemplateDelegate, value, options) {
        if (["left", "right", "top", "bottom"].includes(value)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // Multiboxes.
    Handlebars.registerHelper('multiboxes', function (this: Handlebars.TemplateDelegate, _selected, options) {

        let html = options.fn(this);

        const selected  = Array.isArray(_selected) ? _selected : [_selected]

        if (typeof selected !== 'undefined') {
            selected.forEach(selected_value => {
                if (selected_value !== false) {
                    const escapedValue = RegExp.escape(Handlebars.escapeExpression(selected_value));
                    const rgx = new RegExp(' value=\"' + escapedValue + '\"');
                    html = html.replace(rgx, "$& checked=\"checked\"");
                }
            });
        }
        return html;
    });

    // Trauma Counter
    Handlebars.registerHelper('traumacounter', function (this: Handlebars.TemplateDelegate, selected, options) {

        let html = options.fn(this);

        var count = 0;
        for (const trauma in selected) {
            if (selected[trauma] === true) {
                count++;
            }
        }

        if (count > 4) count = 4;

        const rgx = new RegExp(' value=\"' + count + '\"');
        return html.replace(rgx, "$& checked=\"checked\"");

    });

    // NotEquals handlebar.
    Handlebars.registerHelper('noteq', function(this: Handlebars.TemplateDelegate, a, b, options) {
        return (a !== b) ? options.fn(this) : '';
    });

    // ReputationTurf handlebar.
    Handlebars.registerHelper('repturf', function(this: Handlebars.TemplateDelegate, turfs_amount, options) {
        let html = options.fn(this);
        var turfs_amount_int = parseInt(turfs_amount);

        // Can't be more than 6.
        if (turfs_amount_int > 6) {
            turfs_amount_int = 6;
        }

        for (let i = 13 - turfs_amount_int; i <= 12; i++) {
            const rgx = new RegExp(' value=\"' + i + '\"');
            html = html.replace(rgx, "$& disabled=\"disabled\"");
        }
        return html;
    });

    Handlebars.registerHelper('crew_vault_coins', function(this: Handlebars.TemplateDelegate, max_coins, options) {

        let html = options.fn(this);
        for (let i = 1; i <= max_coins; i++) {

            html += "<input type=\"radio\" id=\"crew-coins-vault-" + i + "\" name=\"data.vault.value\" value=\"" + i + "\"><label for=\"crew-coins-vault-" + i + "\"></label>";
        }

        return html;
    });

    Handlebars.registerHelper('crew_experience', function(this: Handlebars.TemplateDelegate, options) {

        let html = options.fn(this);
        for (let i = 1; i <= 10; i++) {

            html += '<input type="radio" id="crew-experience-' + i + '" name="data.experience" value="' + i + '" dtype="Radio"><label for="crew-experience-' + i + '"></label>';
        }

        return html;
    });

    // Enrich the HTML replace /n with <br>
    Handlebars.registerHelper('html', (options) => {

        let text = options.hash['text'].replace(/\n/g, "<br />");

        return new Handlebars.SafeString(text);;
    });

    // "N Times" loop for handlebars.
    //  Block is executed N times starting from n=1.
    //
    // Usage:
    // {{#times_from_1 10}}
    //   <span>{{this}}</span>
    // {{/times_from_1}}
    Handlebars.registerHelper('times_from_1', function (n, block) {

        var accum = '';
        for (var i = 1; i <= n; ++i) {
            accum += block.fn(i);
        }
        return accum;
    });

    // "N Times" loop for handlebars.
    //  Block is executed N times starting from n=0.
    //
    // Usage:
    // {{#times_from_0 10}}
    //   <span>{{this}}</span>
    // {{/times_from_0}}
    Handlebars.registerHelper('times_from_0', function (n, block) {

        var accum = '';
        for (var i = 0; i <= n; ++i) {
            accum += block.fn(i);
        }
        return accum;
    });

    // Concat helper
    // https://gist.github.com/adg29/f312d6fab93652944a8a1026142491b1
    // Usage: (concat 'first 'second')
    Handlebars.registerHelper('concat', function () {
        var outStr = '';
        for (var arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    });


    /**
     * @inheritDoc
     * Takes label from Selected option instead of just plain value.
     */

    Handlebars.registerHelper('selectOptionsWithLabel', function (choices, options) {

        const localize = options.hash['localize'] ?? false;
        let selected = options.hash['selected'] ?? null;
        let blank = options.hash['blank'] || null;
        selected = selected instanceof Array ? selected.map(String) : [String(selected)];

        // Create an option
        const option = (key: string, object: any) => {
            if (localize) object.label = game.i18n.localize(object.label);
            let isSelected = selected.includes(key);
            html += `<option value="${key}" ${isSelected ? "selected" : ""}>${object.label}</option>`
        };

        // Create the options
        let html = "";
        if (blank) option("", blank);
        Object.entries(choices).forEach(e => option(...e));

        return new Handlebars.SafeString(html);
    });


    /**
     * Create appropriate Forged clock
     */

    Handlebars.registerHelper('forged-clock', function (parameter_name, type, current_value, uniq_id) {

        let html = '';

        if (current_value === null) {
            current_value = 0;
        }

        if (parseInt(current_value) > parseInt(type)) {
            current_value = type;
        }

        // Label for 0
        html += `<label class="clock-zero-label" for="clock-0-${uniq_id}}"><i class="fab fa-creative-commons-zero nullifier"></i></label>`;
        html += `<div id="forged-clock-${uniq_id}" class="forged-clock clock-${type} clock-${type}-${current_value}" style="background-image:url('/systems/forged-in-the-dark/styles/assets/progressclocks-svg/Progress Clock ${type}-${current_value}.svg');">`;

        let zero_checked = (parseInt(current_value) === 0) ? 'checked="checked"' : '';
        html += `<input type="radio" value="0" id="clock-0-${uniq_id}}" name="${parameter_name}" ${zero_checked}>`;

        for (let i = 1; i <= parseInt(type); i++) {
            let checked = (parseInt(current_value) === i) ? 'checked="checked"' : '';
            html += `
    <input type="radio" value="${i}" id="clock-${i}-${uniq_id}" name="${parameter_name}" ${checked}>
    <label for="clock-${i}-${uniq_id}"></label>
  `;
        }

        html += `</div>`;
        return html;
    });
})