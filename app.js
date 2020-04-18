import {TodoModel, FoldModel, CountModel} from './model/index.js';
import {ListView, ListFoldButtonView, InputView} from './component/index.js';
import { ActionDispatcher } from './common/index.js';
import {ActionEvent} from './constant/ActionEvent.js';

const initialDataUrl = `http://${location.host}/data/initData.json`;
// Model
const todoModel = new TodoModel(initialDataUrl);
const foldModel = new FoldModel();

// Dispatcher
const actionDispatcher = new ActionDispatcher({todoModel, foldModel});

// View
new InputView(actionDispatcher, todoModel);
new CountModel(actionDispatcher, todoModel);
new ListView(actionDispatcher, todoModel, foldModel);
new ListFoldButtonView(actionDispatcher, foldModel);

document.addEventListener('DOMContentLoaded', () => {
    actionDispatcher.dispatch(ActionEvent.INIT);
});