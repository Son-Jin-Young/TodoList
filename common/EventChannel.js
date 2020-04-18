export class EventChannel {
    constructor() {
        this.eventMap = new Map();
    }

    subscribe(eventType, fn) {
        if (this.eventMap.has(eventType)) {
            this.eventMap.get(eventType).add(fn);
        } else {
            this.eventMap.set(eventType, (new Set()).add(fn));
        }
    }

    publish(eventType, data) {
        const fnList = this.eventMap.get(eventType);
        fnList && fnList.forEach(fn => fn(data));
    }
}