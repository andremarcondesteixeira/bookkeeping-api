import type { Account } from "./Account";
import type { Money } from "./Money";

export type TransactionComponent = {
    account: Account;
    amount: Money;
};

export type TransactionConstructorProps = {
    credits: TransactionComponent[];
    debits: TransactionComponent[];
};

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
}
