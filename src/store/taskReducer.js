export function taskReducer(state = [], action) {
  switch (action.type) {
    case "task/updated": {
      const newArr = [...state];
      const elemIndex = newArr.findIndex(
        (elem) => elem.id === action.payload.id
      );
      newArr[elemIndex] = { ...newArr[elemIndex], ...action.payload };
      return newArr;
    }
    case "task/delete": {
      return state.filter((elem) => elem.id !== action.payload.id);
    }
    default:
      return state;
  }
}
