export type MoneyConstructorProps = {
    value: number;
    currency: string;
};

export class Money {
    private _value: number;
    private _currency: string;

    constructor(props: MoneyConstructorProps) {
        this._value = props.value;
        this._currency = props.currency;
    }

    get value() {
        return this._value;
    }

    get currency() {
        return this._currency;
    }
}
