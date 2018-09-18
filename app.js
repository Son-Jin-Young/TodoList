import {TodoModel, ListView, ListFoldButtonView, InputView, FoldModel} from './todo.js';
import { ActionDispatcher } from './common.js';

const initialDataUrl = 'http://localhost:3002/data/initData.json';
// Model
const todoModel = new TodoModel(initialDataUrl);
const foldModel = new FoldModel();

// Dispatcher
const actionDispatcher = new ActionDispatcher({todoModel, foldModel});

// View
new InputView(actionDispatcher, todoModel);
new ListView(actionDispatcher, todoModel, foldModel);
new ListFoldButtonView(actionDispatcher, foldModel);

document.addEventListener('DOMContentLoaded', () => {
    actionDispatcher.dispatch('FETCH_INIT_DATA');
});