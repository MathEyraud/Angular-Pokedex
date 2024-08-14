import { NamedAPIResource } from "../../utility/common-models/common-models";

export class MoveStatChange {

    constructor(
        private _change: number,
        private _stat: NamedAPIResource,
    ) {}

    get change(): number { return this._change; }
    set change(value: number) { this._change = value; }

    get stat(): NamedAPIResource { return this._stat; }
    set stat(value: NamedAPIResource) { this._stat = value; }
}