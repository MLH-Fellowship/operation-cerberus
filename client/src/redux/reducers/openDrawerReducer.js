import { OPEN_DRAWER, CLOSE_DRAWER } from '../types/types';

const initialState = {
  isOpen: false,
};

const openDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        isOpen: true,
      };

    case CLOSE_DRAWER:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};

export default openDrawerReducer;
