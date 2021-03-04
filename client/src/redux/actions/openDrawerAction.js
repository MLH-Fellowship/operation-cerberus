import { OPEN_DRAWER, CLOSE_DRAWER } from '../types/types';

export const OpenDrawerAction = () => {
  return {
    type: OPEN_DRAWER,
  };
};

export const CloseDrawerAction = () => {
  return {
    type: CLOSE_DRAWER,
  };
};
