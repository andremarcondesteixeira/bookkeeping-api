import { Currency, MoneyFacade } from "./MoneyFacade";
import type { WithMonetaryValue } from "./types/WithMonetaryValue";

export class Company {
    private _assets: WithMonetaryValue[];
    private _defaultCurrency: Currency;
    private _liabilities: WithMonetaryValue[];
    private _name: string;

    constructor({ assets, defaultCurrency, liabilities, name }: CompanyConstructorProps) {
        this._assets = assets;
        this._liabilities = liabilities;
        this._defaultCurrency = defaultCurrency;
        this._name = name;
    }

    get assets() {
        return [...this._assets];
    }

    get defaultCurrency() {
        return this._defaultCurrency;
    }

    get liabilities() {
        return [...this._liabilities];
    }

    get name() {
        return this._name;
    }

    get totalAssets() {
        const initialValue = new MoneyFacade({
            currency: this._assets[0]?.value.currency ?? this._defaultCurrency,
            valueInMinorUnits: 0,
        });

        return this._assets.reduce((total, asset) => {
            return total.plus(asset.value);
        }, initialValue);
    }

    get totalLiabilities() {
        const initialValue = new MoneyFacade({
            currency: this._assets[0]?.value.currency ?? this._defaultCurrency,
            valueInMinorUnits: 0,
        });

        return this._liabilities.reduce((total, liability) => {
            return total.plus(liability.value);
        }, initialValue);
    }
}

export type CompanyConstructorProps = {
    assets: WithMonetaryValue[];
    defaultCurrency: Currency;
    liabilities: WithMonetaryValue[];
    name: string;
};
