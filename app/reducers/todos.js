import * as ActionTypes from '../constants/ActionTypes';
import Root from '../containers/Root';

const initialState = {
  login_state: 'NOT_LOGIN'
};

function posts(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case ActionTypes.LOGIN:
            console.log("posts:"+action.type);
            return { ...state, isFetching: true }

        default:
            return state
    }
}

const actionsMap = {
  [ActionTypes.LOGIN](state, action) {
      // Root.action(ActionTypes.LOGIN);
      return { ...state,
          [action.name]: posts(state[action.name], action)
      }
  }
};

export default function states(state = initialState, action) {
    // console.log(state);
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
