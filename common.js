class Observable {
    constructor() {
        this._observers = new Set();
    }

    subscribe(observer) {
        this._observers.add(observer);
    }

    unsubscribe(observer) {
        this._observers = [...this._observers].filter(subscriber => subscriber !== observer);
    }

    notify(data) {
        this._observers.forEach(observer => {
            observer(data);
        });
    }
}

class EventChannel {
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

export {Observable, EventChannel};