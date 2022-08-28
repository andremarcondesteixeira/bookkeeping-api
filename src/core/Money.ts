export type MoneyConstructorProps = {
    currency: string;
    valueInMinorUnits: number;
};

export class Money {
    private _valueInMinorUnits: number;
    private _currency: string;

    constructor(props: MoneyConstructorProps) {
        this._valueInMinorUnits = props.valueInMinorUnits;
        this._currency = props.currency;
    }

    get valueInMinorUnits() {
        return this._valueInMinorUnits;
    }

    get currency() {
        return this._currency;
    }
}
