import { OPEN_DRAWER, CLOSE_DRAWER } from '../types/types';

const OpenDrawerAction = () => (dispatch) =>
  dispatch({
    type: OPEN_DRAWER,
  });

const CloseDrawerAction = () => (dispatch) =>
  dispatch({
    type: CLOSE_DRAWER,
  });

export { OpenDrawerAction, CloseDrawerAction };
