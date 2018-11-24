import {
  TOPURL_PAGE_LOADED,
  TOPURL_PAGE_UNLOADED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case TOPURL_PAGE_LOADED:
      return {
        ...state,
        urls: action.payload.data ? action.payload.data.urlsTop : []
      };
    case TOPURL_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
