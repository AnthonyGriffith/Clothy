import {
  ADD_ITEM,
  GET_ITEMS,
  EDIT_ITEM,
  DELETE_ITEM,
  GET_ITEM,
} from '../actions/types.js';

const INITAL_STATE = {
  all: [],
  available: [],
  bought: [],
};

const itemsReducer = (state = INITAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      return {
        ...state,
        all: [...state.all, payload],
        available: [...state.available, payload],
      };
    case GET_ITEMS:
      return {
        ...state,
        all: payload,
        available: payload,
      };
    case GET_ITEM:
      const addItemHandler = (list, item) => {
        if (list.some((el) => el.id === item.id)) {
          return list.map((mapEl) => (mapEl.id === item.id ? item : mapEl));
        }
        return [...list, item];
      };
      return {
        ...state,
        all: addItemHandler(state.all, payload),
        available: addItemHandler(state.available, payload),
      };
    case EDIT_ITEM:
      const newListHandler = (list) =>
        list.map((el) => (el.id === payload.id ? payload : el));
      return {
        ...state,
        all: newListHandler(state.all),
        available: newListHandler(state.available),
      };
    case DELETE_ITEM:
      const newListHandlerDelete = (list) =>
        list.filter((el) => el.id !== payload);
      return {
        ...state,
        all: newListHandlerDelete(state.all),
        available: newListHandlerDelete(state.available),
      };
    default:
      return state;
  }
};

export default itemsReducer;
