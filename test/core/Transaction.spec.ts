import { Account } from "../../src/core/Account";
import { AccountingNature } from "../../src/core/AccountingNature";
import { DateTimeFacade } from "../../src/core/DateTimeFacade";
import { MoneyFacade } from "../../src/core/MoneyFacade";
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
        const money = new MoneyFacade({
            valueInMinorUnits: 1000,
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
            description: "test",
            when: DateTimeFacade.fromIso("2022-08-28T19:36:00Z"),
        });
        expect(transaction.credits[0]?.account).toBe(initialBalancesAccount);
        expect(transaction.credits[0]?.amount).toBe(money);
        expect(transaction.debits[0]?.account).toBe(bankAccount);
        expect(transaction.debits[0]?.amount).toBe(money);
        expect(transaction.description).toEqual("test");
        expect(transaction.when.toUtcIsoString()).toEqual("2022-08-28T19:36:00.000Z");
    });

    test("The amount of credits must be equal to the amount of debits", () => {
        const transaction = new Transaction({
            credits: [
                {
                    account: new Account({
                        name: "A",
                        nature: AccountingNature.CREDIT,
                    }),
                    amount: new MoneyFacade({
                        valueInMinorUnits: 100,
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
                    amount: new MoneyFacade({
                        valueInMinorUnits: 120,
                        currency: "BRL",
                    }),
                },
            ],
            description: "test",
            when: DateTimeFacade.fromIso("2022-08-28T19:36:00"),
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
                    amount: new MoneyFacade({
                        valueInMinorUnits: 100,
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
                    amount: new MoneyFacade({
                        valueInMinorUnits: 100,
                        currency: "USD",
                    }),
                },
            ],
            description: "test",
            when: DateTimeFacade.fromIso("2022-08-28T19:36:00"),
        });
        expect(transaction.validate().isValid).toBe(false);
        expect(transaction.validate().error).toEqual(TransactionValidationError.DIFFERENT_CURRENCIES);
    });
});
