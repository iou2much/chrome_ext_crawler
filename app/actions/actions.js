import * as types from '../constants/ActionTypes';

//export function addTodo(text) {
//  return { type: types.ADD_TODO, text };
//}
//
//export function deleteTodo(id) {
//  return { type: types.DELETE_TODO, id };
//}
//
//export function editTodo(id, text) {
//  return { type: types.EDIT_TODO, id, text };
//}
//
//export function completeTodo(id) {
//  return { type: types.COMPLETE_TODO, id };
//}
//
//export function completeAll() {
//  return { type: types.COMPLETE_ALL };
//}
//
//export function clearCompleted() {
//  return { type: types.CLEAR_COMPLETED };
//}
export function login(name,pwd) {
    // console.log("actions.js:"+name);
    return { type:types.LOGIN,userName:name,password:pwd };
}

export function crawl() {
   return { type:types.CRAWL };
}
export function exportFile() {
    return { type:types.EXPORT};
}
export function crawlKW(keywords) {
    console.log(keywords)
    return { type:types.CRAWLKW ,keywords:keywords};
}
export function exportKWFile() {
    return { type:types.EXPORTKW};
}
