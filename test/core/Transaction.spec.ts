import { Account } from "../../src/core/Account";
import { AccountingNature } from "../../src/core/enums/AccountingNature";
import { DateTimeFacade } from "../../src/core/DateTimeFacade";
import { MoneyFacade } from "../../src/core/MoneyFacade";
import { Transaction, TransactionValidationError } from "../../src/core/Transaction";

describe("Transaction component", () => {
    let accountA: Account;
    let accountB: Account;
    let BRL_100: MoneyFacade;

    beforeEach(() => {
        accountA = new Account({
            name: "A",
            nature: AccountingNature.CREDIT,
        });

        accountB = new Account({
            name: "B",
            nature: AccountingNature.DEBIT,
        });

        BRL_100 = new MoneyFacade({
            currency: "BRL",
            valueInMinorUnits: 100,
        });
    });

    test("A Transaction component can be created", () => {
        const transaction = new Transaction({
            credits: [{ account: accountA, amount: BRL_100 }],
            debits: [{ account: accountB, amount: BRL_100 }],
            description: "test",
            when: DateTimeFacade.fromIso("2022-08-28T19:36:00Z"),
        });
        expect(transaction.credits[0]?.account).toBe(accountA);
        expect(transaction.credits[0]?.amount).toBe(BRL_100);
        expect(transaction.debits[0]?.account).toBe(accountB);
        expect(transaction.debits[0]?.amount).toBe(BRL_100);
        expect(transaction.description).toEqual("test");
        expect(transaction.when.toUtcIsoString()).toEqual("2022-08-28T19:36:00.000Z");
    });

    test("A valid transaction passes validation", () => {
        const transaction = new Transaction({
            credits: [{ account: accountA, amount: BRL_100 }],
            debits: [{ account: accountB, amount: BRL_100 }],
            description: "test",
            when: DateTimeFacade.fromIso("2022-08-28T19:36:00"),
        });
        const validationResult = transaction.validate();
        expect(validationResult.isValid).toBe(true);
        expect(validationResult.error).toBeUndefined();
    });

    test("The amount of credits must be equal to the amount of debits", () => {
        const transaction = new Transaction({
            credits: [{ account: accountA, amount: BRL_100 }],
            debits: [
                {
                    account: accountB,
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
            credits: [{ account: accountA, amount: BRL_100 }],
            debits: [
                {
                    account: accountB,
                    amount: new MoneyFacade({
                        currency: "USD",
                        valueInMinorUnits: 100,
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
