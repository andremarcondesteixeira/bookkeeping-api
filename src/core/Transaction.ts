import type { Account } from "./Account";
import type { DateTimeFacade } from "./DateTimeFacade";
import type { MoneyFacade } from "./MoneyFacade";

export class Transaction {
    private _credits: TransactionComponent[];
    private _debits: TransactionComponent[];
    private _description: string;
    private _when: DateTimeFacade;

    constructor(props: TransactionConstructorProps) {
        this._credits = [...props.credits];
        this._debits = [...props.debits];
        this._description = props.description;
        this._when = props.when;
    }

    get credits() {
        return [...this._credits];
    }

    get debits() {
        return [...this._debits];
    }

    get description() {
        return this._description;
    }

    get when() {
        return this._when;
    }

    validate() {
        const sameCurrency = [...this._credits, ...this._debits].every((entry, _, entries) => {
            return entry.amount.currency === entries[0]?.amount.currency;
        });

        if (!sameCurrency) {
            return {
                isValid: false,
                error: TransactionValidationError.DIFFERENT_CURRENCIES,
            };
        }

        const sumOfCredits = this._credits.reduce((sum, entry) => {
            return sum + entry.amount.valueInMinorUnits;
        }, 0);
        const sumOfDebits = this._debits.reduce((sum, entry) => {
            return sum + entry.amount.valueInMinorUnits;
        }, 0);

        const isValid = sumOfCredits === sumOfDebits;

        return {
            isValid,
            error: isValid ? undefined : TransactionValidationError.SUM_OF_CREDITS_DIFFERENT_THAN_SUM_OF_DEBITS,
        };
    }
}

export type TransactionConstructorProps = {
    credits: TransactionComponent[];
    debits: TransactionComponent[];
    description: string;
    when: DateTimeFacade;
};

export type TransactionComponent = {
    account: Account;
    amount: MoneyFacade;
};

export enum TransactionValidationError {
    DIFFERENT_CURRENCIES = "Attempt to use different currencies in the same transaction",
    SUM_OF_CREDITS_DIFFERENT_THAN_SUM_OF_DEBITS = "The sum of credits is not equal to the sum of debits",
}
