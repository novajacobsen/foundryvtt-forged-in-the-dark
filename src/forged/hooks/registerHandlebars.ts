export const registerHandlebars = () => {
    // Multiboxes.
    Handlebars.registerHelper(
      "multiboxes",
      function (this: Handlebars.TemplateDelegate, _selected, options) {
        let html = options.fn(this);

        const selected = Array.isArray(_selected) ? _selected : [_selected];

        if (typeof selected !== "undefined") {
          selected.forEach((selected_value) => {
            if (selected_value !== false) {
              // @ts-ignore
              const escapedValue = RegExp.escape(
                Handlebars.escapeExpression(selected_value)
              );
              const rgx = new RegExp(' value="' + escapedValue + '"');
              html = html.replace(rgx, '$& checked="checked"');
            }
          });
        }
        return html;
      }
    );

    // NotEquals handlebar.
    Handlebars.registerHelper(
      "noteq",
      function (this: Handlebars.TemplateDelegate, a, b, options) {
        return a !== b ? options.fn(this) : "";
      }
    );

    // Enrich the HTML replace /n with <br>
    Handlebars.registerHelper("html", (options) => {
      let text = options.hash["text"].replace(/\n/g, "<br />");

      return new Handlebars.SafeString(text);
    });

    // "N Times" loop for handlebars.
    //  Block is executed N times starting from n=1.
    //
    // Usage:
    // {{#times_from_1 10}}
    //   <span>{{this}}</span>
    // {{/times_from_1}}
    Handlebars.registerHelper("times_from_1", function (n, block) {
      var accum = "";
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
    Handlebars.registerHelper("times_from_0", function (n, block) {
      var accum = "";
      for (var i = 0; i <= n; ++i) {
        accum += block.fn(i);
      }
      return accum;
    });

    // Concat helper
    // https://gist.github.com/adg29/f312d6fab93652944a8a1026142491b1
    // Usage: (concat 'first 'second')
    Handlebars.registerHelper("concat", function () {
      var outStr = "";
      for (var arg in arguments) {
        if (typeof arguments[arg] != "object") {
          outStr += arguments[arg];
        }
      }
      return outStr;
    });

    /**
     * @inheritDoc
     * Takes label from Selected option instead of just plain value.
     */
    Handlebars.registerHelper(
      "selectOptionsWithLabel",
      function (choices, options) {
        const localize = options.hash["localize"] ?? false;
        let selected = options.hash["selected"] ?? null;
        let blank = options.hash["blank"] || null;
        selected =
          selected instanceof Array ? selected.map(String) : [String(selected)];

        // Create an option
        const option = (key: string, object: any) => {
          if (localize) object.label = game.i18n.localize(object.label);
          let isSelected = selected.includes(key);
          html += `<option value="${key}" ${isSelected ? "selected" : ""}>${
            object.label
          }</option>`;
        };

        // Create the options
        let html = "";
        if (blank) option("", blank);
        Object.entries(choices).forEach((e) => option(...e));

        return new Handlebars.SafeString(html);
      }
    );
  }