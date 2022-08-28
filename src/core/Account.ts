import type { AccountingNature } from "./AccountingNature";

export type AccountConstructorProps = {
    name: string;
    nature: AccountingNature;
};

export class Account {
    private _name: string;
    private _nature: AccountingNature;

    constructor(props: AccountConstructorProps) {
        this._name = props.name;
        this._nature = props.nature;
    }

    get name() {
        return this._name;
    }

    get nature() {
        return this._nature;
    }
}
