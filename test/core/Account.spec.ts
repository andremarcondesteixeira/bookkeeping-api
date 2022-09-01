import { Account } from "../../src/core/Account";
import { AccountingNature } from "../../src/core/enums/AccountingNature";

describe("Account", () => {
    test("An Account can be created", () => {
        const account = new Account({
            name: "Test",
            nature: AccountingNature.DEBIT,
        });
        expect(account.name).toEqual("Test");
        expect(account.nature).toEqual(AccountingNature.DEBIT);
    });
});
