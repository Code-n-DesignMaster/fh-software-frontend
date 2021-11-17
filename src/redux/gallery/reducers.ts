import { createReducers } from '@lib/redux';
import { merge } from 'lodash';
import {
  getGalleries,
  getGalleriesSuccess,
  getGalleriesFail,
  moreGallery, 
  moreGallerySuccess, 
  moreGalleryFail,
  getRelatedGalleries, 
  getRelatedGalleriesSuccess, 
  getRelatedGalleriesFail
} from './actions';

const initialState = {
  listGalleries: {
    requesting: false,
    items: [],
    total: 0,
    error: null,
    success: false
  },
  relatedGalleries: {
    requesting: false,
    error: null,
    success: false,
    items: [],
    total: 0
  }
};

const galleryReducer = [
  {
    on: getGalleries,
    reducer(state: any) {
      return {
        ...state,
        listGalleries: {
          items: { ...state.listGalleries.items },
          total: { ...state.listGalleries.total },
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: getGalleriesSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        listGalleries: {
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          error: null,
          success: true
        }
      };
    }
  },
  {
    on: getGalleriesFail,
    reducer(state: any, data: any) {
      return {
        ...state,
        listGalleries: {
          items: { ...state.listGalleries.items },
          total: { ...state.listGalleries.total },
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  },
  {
    on: moreGallery,
    reducer(state: any) {
      return {
        ...state,
        listGalleries: {
          ...state.listGalleries,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: moreGallerySuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        listGalleries: {
          requesting: false,
          total: data.payload.total,
          items: [...state.listGalleries.items, ...data.payload.data],
          success: true
        }
      };
    }
  },
  {
    on: moreGalleryFail,
    reducer(state: any, data: any) {
      return {
        ...state,
        listGalleries: {
          ...state.listGalleries,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  },
  {
    on: getRelatedGalleries,
    reducer(state: any) {
      return {
        ...state,
        relatedGalleries: {
          ...state.galleries,
          requesting: true
        },
      };
    }
  },
  {
    on: getRelatedGalleriesSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        relatedGalleries: {
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          success: true
        },
      };
    }
  },
  {
    on: getRelatedGalleriesFail,
    reducer(state: any, data: any) {
      return {
        ...state,
        relatedGalleries: {
          ...state.galleries,
          requesting: false,
          error: data.payload
        },
      };
    }
  }
];

export default merge({}, createReducers('gallery', [galleryReducer], initialState));
