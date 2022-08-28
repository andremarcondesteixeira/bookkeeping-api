import { DateTime, Zone } from "luxon";

export class DateTimeFacade {
    private _internalObject;

    private constructor(props: DateTime) {
        this._internalObject = props;
    }

    static fromIso(isoDateTime: string) {
        const wrapped3rdPartyLibObj = DateTime.fromISO(isoDateTime);
        return new DateTimeFacade(wrapped3rdPartyLibObj);
    }

    compareTo(other: DateTimeFacade) {
        return this.toMillis() - other.toMillis();
    }

    toMillis() {
        return this._internalObject.toMillis();
    }

    toUtcIsoString() {
        return this._internalObject.toUTC().toISO();
    }
}

export type TimeZone = Zone;
