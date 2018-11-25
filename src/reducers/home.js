import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  UPDATE_URL,
  ADD_URL,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        urls: action.payload.data ? action.payload.data.urls: [],
        urlIds: action.urlIds,
        url: '',
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case UPDATE_URL:
        return {
          ...state,
          url: action.url.url,
        };
    case ADD_URL:
      return {
        ...state,
        urls: [action.payload.data.shortenLink].concat(state.urls),
        urlIds: action.urlIds,
        url: '',
      };
    default:
      return state;
  }
};
