import { Categories } from "../Attributes";

const d: Categories = {
  "e95e16b0-a1bb-4af8-ae19-28d656aec023": {
    name: "Insight",
    attributes: {
      "4fcf5f63-20d2-49df-b35b-d2fc1fca0792": "Hunt",
      "92f85fc3-8ab3-4e61-afc5-e45d2dc470a9": "Study",
      "b51ec1b5-355b-447b-b4f0-d8b678027fcb": "Survery",
      "0be5dd8e-b53d-45a7-a91e-b4affd358a50": "Tinker",
    },
  },
  "897fa79c-af75-473a-b992-71524036108e": {
    name: "Prowess",
    attributes: {
      "382b74dc-0a4f-4710-9c8a-7a8a713a664a": "Finesse",
      "90fa1e61-70aa-4f68-9542-61b7467790e7": "Prowl",
      "b071849c-cf38-4128-a937-cb286c8e5e27": "Skirmish",
      "a51b2da5-dd45-4c7f-b3b3-bbfe1acd4b22": "Wreck",
    },
  },
  "4be95e07-25c9-452c-9757-bca62f803693": {
    name: "Resolve",
    attributes: {
      "2917f9dc-23e8-48fd-b8c8-1afae3dd179c": "Attune",
      "ffd92bcc-a2f2-456e-b4aa-c590afd96b80": "Command",
      "91309205-c06d-4c87-b279-4ae048ed90b6": "Consort",
      "6a1c5741-5321-4f7e-9cb5-cb8f902adae4": "Sway",
    },
  },
};

export const attributes = {
  name: "Attributes",
  scope: "world",
  type: Object,
  default: d,
};
