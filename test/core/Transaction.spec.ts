import { Account } from "../../src/core/Account";
import { AccountingNature } from "../../src/core/AccountingNature";
import { Money } from "../../src/core/Money";
import { Transaction, TransactionValidationError } from "../../src/core/Transaction";

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

    test("The amount of credits must be equal to the amount of debits", () => {
        const transaction = new Transaction({
            credits: [
                {
                    account: new Account({
                        name: "A",
                        nature: AccountingNature.CREDIT,
                    }),
                    amount: new Money({
                        value: 100,
                        currency: "BRL",
                    }),
                },
            ],
            debits: [
                {
                    account: new Account({
                        name: "B",
                        nature: AccountingNature.DEBIT,
                    }),
                    amount: new Money({
                        value: 120,
                        currency: "BRL",
                    }),
                },
            ],
        });
        const validationResult = transaction.validate();
        expect(validationResult.isValid).toBe(false);
        expect(validationResult.error).toEqual(TransactionValidationError.SUM_OF_CREDITS_DIFFERENT_THAN_SUM_OF_DEBITS);
    });

    test("Currencies must be the same", () => {
        const transaction = new Transaction({
            credits: [
                {
                    account: new Account({
                        name: "A",
                        nature: AccountingNature.CREDIT,
                    }),
                    amount: new Money({
                        value: 100,
                        currency: "BRL",
                    }),
                },
            ],
            debits: [
                {
                    account: new Account({
                        name: "B",
                        nature: AccountingNature.DEBIT,
                    }),
                    amount: new Money({
                        value: 100,
                        currency: "USD",
                    }),
                },
            ],
        });
        expect(transaction.validate().isValid).toBe(false);
        expect(transaction.validate().error).toEqual(TransactionValidationError.DIFFERENT_CURRENCIES);
    });
});
