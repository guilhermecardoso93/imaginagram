import { USER_POST_CHANGE, USER_POST_CHANGE } from "../constants";

const initialState = {
  currentUser: null,
  posts: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_POST_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
      default:
        return state;
  }
};

export default user;
