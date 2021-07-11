const initialState = {
  currentUser: null,
};

const user = (state = initialState, action) => {
  return {
    ...state,
    currentUser: action.currentUser,
  };
};

export default user;