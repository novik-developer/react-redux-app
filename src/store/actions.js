import * as actionTypes from "./actionTypes";

export function taskComplited(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id, complited: true },
  };
}

export function titleChange(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id, title: `new title for ${id}` },
  };
}
