import { DateTimeFacade } from "../../src/core/DateTimeFacade";

describe("DateTimeFacade", () => {
    test("A DateTimeFacade can be created", () => {
        const instance = DateTimeFacade.fromIso("2022-08-28T19:28:00Z");
        expect(instance.toUtcIsoString()).toEqual("2022-08-28T19:28:00.000Z");
    });

    describe("Comparison operation", () => {
        test("Two instances representing the same moment in time are considered equal", () => {
            const a = DateTimeFacade.fromIso("2022-08-28T19:28:00Z");
            const b = DateTimeFacade.fromIso("2022-08-28T19:28:00Z");
            expect(a.compareTo(b)).toEqual(0);
        });

        test("A is bigger than B if A represents a moment in time that is in the future relative to B", () => {
            const a = DateTimeFacade.fromIso("2022-08-28T19:28:00Z");
            const b = DateTimeFacade.fromIso("2022-08-28T19:00:00Z");
            expect(a.compareTo(b)).toBeGreaterThan(0);
        });

        test("A is smaller than B if A represents a moment in time that is in the past relative to B", () => {
            const a = DateTimeFacade.fromIso("2022-08-28T19:00:00Z");
            const b = DateTimeFacade.fromIso("2022-08-28T19:28:00Z");
            expect(a.compareTo(b)).toBeLessThan(0);
        });
    });
});
