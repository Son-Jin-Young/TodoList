//view들은 model이 어떤 것인지 전혀 모른다.
import {ActionEvent} from '../constant/ActionEvent.js';

export class InputView {
    constructor(actionDispatcher, todoModel) {
        this.regButton = document.querySelector("button");
        this.inputElement = document.querySelector("input[name=todo]")
        this.todoModel = todoModel;
        this.actionDispatcher = actionDispatcher;

        this.initEvents();
    }

    initEvents() {
        this.regButton.addEventListener("click", (e) => {
            const todoText = this.getTodoValue();
            this.actionDispatcher.dispatch(ActionEvent.ADD, todoText);
            this.render();
        });

        this.inputElement.addEventListener("keydown", (e) => {
            if(e.keyCode !== 13) return;
            const todoText = this.getTodoValue();
            this.actionDispatcher.dispatch(ActionEvent.REFRESH_LIST, todoText);
            this.render();
        });
    }

    getTodoValue() { 
        return document.querySelector("input[name=todo]").value;
    }

    render(inputData = "") {
        this.inputElement.value = inputData;
    }
}
