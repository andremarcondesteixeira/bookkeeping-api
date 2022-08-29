import Dinero from "dinero.js";

export class MoneyFacade {
    private _wrappedObj: Dinero.Dinero;

    constructor(props: MoneyConstructorProps) {
        this._wrappedObj = Dinero({
            amount: props.valueInMinorUnits,
            currency: props.currency,
        });
    }

    get valueInMinorUnits() {
        return this._wrappedObj.getAmount();
    }

    get currency() {
        return this._wrappedObj.getCurrency();
    }

    plus(other: MoneyFacade) {
        return this.fromWrappedLibInstance(this._wrappedObj.add(other._wrappedObj));
    }

    private fromWrappedLibInstance(obj: Dinero.Dinero) {
        return new MoneyFacade({
            currency: obj.getCurrency(),
            valueInMinorUnits: obj.getAmount(),
        });
    }
}

export type MoneyConstructorProps = {
    currency: Currency;
    valueInMinorUnits: number;
};

export type Currency = Dinero.Currency;
