import type { Account } from "./Account";
import type { Money } from "./Money";

export class Transaction {
    private _credits: TransactionComponent[];
    private _debits: TransactionComponent[];

    constructor(props: TransactionConstructorProps) {
        this._credits = [...props.credits];
        this._debits = [...props.debits];
    }

    get credits() {
        return [...this._credits];
    }

    get debits() {
        return [...this._debits];
    }

    validate() {
        const sameCurrency = [...this._credits, ...this._debits].every((transactionComponent, _, creditsAndDebits) => {
            return transactionComponent.amount.currency === creditsAndDebits[0]?.amount.currency;
        });

        if (!sameCurrency) {
            return {
                isValid: false,
                error: TransactionValidationError.DIFFERENT_CURRENCIES,
            };
        }

        const sumOfCredits = this._credits.reduce((sum, transactionComponent) => {
            return sum + transactionComponent.amount.value;
        }, 0);
        const sumOfDebits = this._debits.reduce((sum, transactionComponent) => {
            return sum + transactionComponent.amount.value;
        }, 0);

        const isValid = sumOfCredits === sumOfDebits;

        return {
            isValid,
            error: isValid ? undefined : TransactionValidationError.SUM_OF_CREDITS_DIFFERENT_THAN_SUM_OF_DEBITS,
        };
    }
}

export type TransactionComponent = {
    account: Account;
    amount: Money;
};

export type TransactionConstructorProps = {
    credits: TransactionComponent[];
    debits: TransactionComponent[];
};

export enum TransactionValidationError {
    DIFFERENT_CURRENCIES = "Attempt to use different currencies in the same transaction",
    SUM_OF_CREDITS_DIFFERENT_THAN_SUM_OF_DEBITS = "The sum of credits is not equal to the sum of debits",
}
