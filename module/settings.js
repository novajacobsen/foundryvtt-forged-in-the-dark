import { AttributesEditor } from './blades-attribute-editor.js'

export const registerSystemSettings = function () {
  console.log(" Registering BITD settings ")

  /**
   * Track the system version upon which point a migration was last applied
   */
  game.settings.register("bitd", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: Number,
    default: 0
  });


  game.settings.register("blades-in-the-dark", "attributes", {
    name: "Attributes",
    label: "Configure Attributes",
    scope: "world",
    type: Object,
    default: {
      insight: ["Hunt", "Study", "Survey", "Tinker"],
      prowess: ["Finesse", "Prowl", "Skirmish", "Wreck"],
      resolve: ["Attune", "Command", "Consort", "Sway"],
    }
  })

  game.settings.registerMenu("blades-in-the-dark", "attributes", {
    name: "Attributes",
    label: "Configure Attributes",
    icon: "fas fa-edit",
    type: AttributesEditor,
  })
};
