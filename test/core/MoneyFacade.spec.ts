import { MoneyFacade } from "../../src/core/MoneyFacade";

describe("MoneyFacade class", () => {
    let money: MoneyFacade;

    beforeEach(() => {
        money = new MoneyFacade({
            currency: "BRL",
            valueInMinorUnits: 1000,
        });
    });

    test("A MoneyFacade instance can be created", () => {
        expect(money.currency).toEqual("BRL");
        expect(money.valueInMinorUnits).toEqual(1000);
    });

    test("Can sum another amount and get a new instance as result", () => {
        const sumResult = money.plus(
            new MoneyFacade({
                currency: "BRL",
                valueInMinorUnits: 1000,
            })
        );
        expect(sumResult.currency).toEqual("BRL");
        expect(sumResult.valueInMinorUnits).toEqual(2000);
    });

    test("Cannot sum another amount if it uses a different currency", () => {
        const badOperation = () => {
            money.plus(
                new MoneyFacade({
                    currency: "USD",
                    valueInMinorUnits: 1000,
                })
            );
        };
        expect(badOperation).toThrow(TypeError);
        expect(badOperation).toThrow("You must provide a Dinero instance with the same currency");
    });
});
