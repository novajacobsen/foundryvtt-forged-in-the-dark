export interface Attributes {
  [guid: string]: string;
}

export interface Categories {
  [guid: string]: {
    name: string;
    attributes: Attributes;
  };
}
