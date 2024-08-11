export interface INamedAPIResource {
    name: string;
    url: string;
}

export interface IAPIResource {
    url: string;
}

export interface IDescription {
    description: string;
    language: INamedAPIResource;
}

export interface IFlavorText {
    flavor_text: string;
    language: INamedAPIResource;
    version: INamedAPIResource;
}

export interface IName {
    name: string;
    language: INamedAPIResource;
}

export interface IVerboseEffect {
    effect: string;
    short_effect: string;
    language: INamedAPIResource;
}