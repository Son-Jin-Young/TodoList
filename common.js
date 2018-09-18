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

class ActionDispatcher {
    constructor({todoModel, foldModel}) {
        this.todoModel = todoModel;
        this.foldModel = foldModel;
    }

    dispatch(eventType, data) {
        console.log('dispatch event type : ', eventType);
        switch(eventType) {
            case 'ADD_BUTTON':
                this.todoModel.addTodo(data);
                break;
            case 'CHANGE_TODO_LIST':
                this.todoModel.addTodo(data);
                break;
            case 'FETCH_INIT_DATA':
                this.todoModel.getInitialData();
                break;
            case 'CLICK_TOGGLE_BTN':
                this.foldModel.toggleFold();
                break;
        }
    }
}

export {Observable, EventChannel, ActionDispatcher};