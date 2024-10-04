import { Name, NamedAPIResource, VerboseEffect } from "../../utility/common-models/common-models";
import { AbilityEffectChange } from "./ability-effect-change";
import { AbilityFlavorText } from "./ability-flavor-text";
import { AbilityPokemon } from "./ability-pokemon";

export class Ability {

    constructor(
        private _id                 : number,
        private _name               : string,
        private _isMainSeries       : boolean,
        private _generation         : NamedAPIResource,
        private _names              : Name[],
        private _effectEntries      : VerboseEffect[],
        private _effectChanges      : AbilityEffectChange[],
        private _flavorTextEntries  : AbilityFlavorText[],
        private _pokemon            : AbilityPokemon[]
    ) {}

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }

    get isMainSeries(): boolean { return this._isMainSeries; }
    set isMainSeries(value: boolean) { this._isMainSeries = value; }

    get generation(): NamedAPIResource { return this._generation; }
    set generation(value: NamedAPIResource) { this._generation = value; }

    get names(): Name[] { return this._names; }
    set names(value: Name[]) { this._names = value; }

    get effectEntries(): VerboseEffect[] { return this._effectEntries; }
    set effectEntries(value: VerboseEffect[]) { this._effectEntries = value; }

    get effectChanges(): AbilityEffectChange[] { return this._effectChanges; }
    set effectChanges(value: AbilityEffectChange[]) { this._effectChanges = value; }

    get flavorTextEntries(): AbilityFlavorText[] { return this._flavorTextEntries; }
    set flavorTextEntries(value: AbilityFlavorText[]) { this._flavorTextEntries = value; }

    get pokemon(): AbilityPokemon[] { return this._pokemon; }
    set pokemon(value: AbilityPokemon[]) { this._pokemon = value; }

    // ---------------------------------------------- //
    // ----- Getter avec logique supplémentaire ----- //
    // ---------------------------------------------- //
    get formattedName(): string {

        if (!this._name) {
            return "N/A";
        }
    
        // Remplacer les tirets par un espace
        let newName = this._name.replace(/-/g, ' ');
        
        // Traitement pour "mega" et "gmax"
        newName = newName.replace(/\bmega\b/gi, 'Mega');
        newName = newName.replace(/\bgmax\b/gi, 'Gmax');
        
        // Traitement spécial pour "mega x" et "mega y"
        newName = newName.replace(/\bmega\s+x\b/gi, 'Mega X');
        newName = newName.replace(/\bmega\s+y\b/gi, 'Mega Y');
    
        // Capitaliser la première lettre de chaque mot
        return newName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
}