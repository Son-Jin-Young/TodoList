import {ActionEvent} from '../constant/ActionEvent.js';

export class ActionDispatcher {
    constructor({todoModel, foldModel}) {
        this.todoModel = todoModel;
        this.foldModel = foldModel;
    }

    dispatch(eventType, data) {
        console.log('dispatch event type : ', eventType);
        switch(eventType) {
            case ActionEvent.ADD:
                this.todoModel.addTodo(data);
                break;
            case ActionEvent.CHANGE_STATUS:
                this.todoModel.doneTodo(data);
                break;
            case ActionEvent.REFRESH_LIST:
                this.todoModel.addTodo(data);
                break;
            case ActionEvent.INIT:
                this.todoModel.getInitialData();
                break;
            case ActionEvent.TOGGLE_LIST:
                this.foldModel.toggleFold();
                break;
        }
    }
}
