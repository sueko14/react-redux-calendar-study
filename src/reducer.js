const initialState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1
};

function addReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, month: state.month + 1 };
    case "DECREASE":
      return { ...state, month: state.month - 1 };
    default:
      return state;
  }
}

export default addReducer;
