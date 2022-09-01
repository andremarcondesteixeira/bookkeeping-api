import { Company } from "../../src/core/Company";
import { MoneyFacade } from "../../src/core/MoneyFacade";

describe("Company", () => {
    test("A Company can be created", () => {
        const company = new Company({
            assets: [
                { value: new MoneyFacade({ currency: "BRL", valueInMinorUnits: 5000_00 }) },
                { value: new MoneyFacade({ currency: "BRL", valueInMinorUnits: 2000_00 }) },
            ],
            defaultCurrency: "BRL",
            liabilities: [
                { value: new MoneyFacade({ currency: "BRL", valueInMinorUnits: 1000_00 }) },
                { value: new MoneyFacade({ currency: "BRL", valueInMinorUnits: 500_00 }) },
            ],
            name: "The Company",
        });

        expect(company.assets).toHaveLength(2);
        expect(company.assets[0]?.value.currency).toEqual("BRL");
        expect(company.assets[0]?.value.valueInMinorUnits).toEqual(5000_00);
        expect(company.assets[1]?.value.currency).toEqual("BRL");
        expect(company.assets[1]?.value.valueInMinorUnits).toEqual(2000_00);

        expect(company.defaultCurrency).toEqual("BRL");

        expect(company.liabilities).toHaveLength(2);
        expect(company.liabilities[0]?.value.currency).toStrictEqual("BRL");
        expect(company.liabilities[0]?.value.valueInMinorUnits).toStrictEqual(1000_00);
        expect(company.liabilities[1]?.value.currency).toStrictEqual("BRL");
        expect(company.liabilities[1]?.value.valueInMinorUnits).toStrictEqual(500_00);

        expect(company.name).toEqual("The Company");

        expect(company.totalAssets.currency).toEqual("BRL");
        expect(company.totalAssets.valueInMinorUnits).toEqual(7000_00);

        expect(company.totalLiabilities.currency).toEqual("BRL");
        expect(company.totalLiabilities.valueInMinorUnits).toEqual(1500_00);
    });

    test("totalAssets is 0 when there are no assets, same for totalLiabilities", () => {
        const company = new Company({
            assets: [],
            defaultCurrency: "XXX",
            liabilities: [],
            name: "A Company",
        });

        expect(company.assets).toHaveLength(0);

        expect(company.defaultCurrency).toEqual("XXX");

        expect(company.liabilities).toHaveLength(0);

        expect(company.name).toEqual("A Company");

        expect(company.totalAssets.currency).toEqual(company.defaultCurrency);
        expect(company.totalAssets.valueInMinorUnits).toEqual(0);

        expect(company.totalLiabilities.currency).toEqual(company.defaultCurrency);
        expect(company.totalLiabilities.valueInMinorUnits).toEqual(0);
    });
});
