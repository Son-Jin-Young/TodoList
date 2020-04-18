import {ActionEvent} from '../constant/ActionEvent.js';

export class ListFoldButtonView {
    constructor(actionDispatcher, foldModel) {
        // 컨트롤할 View
        this.foldButton = document.querySelector('.fold');
        // view의 이벤트
        this.addFoldHandler = null;
        this.foldModel = foldModel;
        this.actionDispatcher = actionDispatcher;
        this.initEvents();
        this.subscribe();
    }

    subscribe() {
        this.foldModel.subscribe(ActionEvent.TOGGLE_LIST, (isFold) => {
            this.render(isFold);
        }); 
    }

    initEvents() {
        this.foldButton.addEventListener('click', (e) => {
            // this.foldModel.toggleFold.call(this.foldModel);
            this.actionDispatcher.dispatch(ActionEvent.TOGGLE_LIST);
        });
    }
 
    render(isFold) {
        if (isFold) {
            this.foldButton.innerHTML = '펼치기';
        } else {
            this.foldButton.innerHTML = '접기';
        }
    }

}