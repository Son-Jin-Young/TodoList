import {Observable} from '../common/Observable.js';
import {EventChannel} from '../common/EventChannel.js';
import {ActionEvent} from '../constant/ActionEvent.js';

export class FoldModel extends EventChannel/* Observable */ {
    constructor() {
        super();
        this.isFold = false;
    }

    toggleFold() {
        this.isFold = !this.isFold;
        // this.notify(this.isFold);
        this.publish(ActionEvent.TOGGLE_LIST, this.isFold);
    }

    get fold() {
        return this.isFold;
    }
}
