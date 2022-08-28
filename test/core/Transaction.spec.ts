import { Account } from "../../src/core/Account";
import { AccountingNature } from "../../src/core/AccountingNature";
import { Money } from "../../src/core/Money";
import { Transaction } from "../../src/core/Transaction";

describe("Transaction component", () => {
    test("A Transaction component can be created", () => {
        const initialBalancesAccount = new Account({
            name: "Initial Balances",
            nature: AccountingNature.CREDIT,
        });
        const bankAccount = new Account({
            name: "Bank",
            nature: AccountingNature.DEBIT,
        });
        const money = new Money({
            value: 1000,
            currency: "USD",
        });
        const transaction = new Transaction({
            credits: [
                {
                    account: initialBalancesAccount,
                    amount: money,
                },
            ],
            debits: [
                {
                    account: bankAccount,
                    amount: money,
                },
            ],
        });
        expect(transaction.credits[0]?.account).toBe(initialBalancesAccount);
        expect(transaction.credits[0]?.amount).toBe(money);
        expect(transaction.debits[0]?.account).toBe(bankAccount);
        expect(transaction.debits[0]?.amount).toBe(money);
    });
});
