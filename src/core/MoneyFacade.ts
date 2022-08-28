import Dinero from "dinero.js";

export class MoneyFacade {
    private _internalObj: Dinero.Dinero;

    constructor(props: MoneyConstructorProps) {
        this._internalObj = Dinero({
            amount: props.valueInMinorUnits,
            currency: props.currency,
        });
    }

    get valueInMinorUnits() {
        return this._internalObj.getAmount();
    }

    get currency() {
        return this._internalObj.getCurrency();
    }
}

export type MoneyConstructorProps = {
    currency: Currency;
    valueInMinorUnits: number;
};

export type Currency = Dinero.Currency;
