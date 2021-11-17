import { createAsyncAction } from '@lib/redux';

export const {
  getGalleries,
  getGalleriesSuccess,
  getGalleriesFail
} = createAsyncAction('getGalleries', 'GET_GALLERIES');

export const {
  moreGallery,
  moreGallerySuccess,
  moreGalleryFail
} = createAsyncAction('moreGallery', 'MORE_GALLERY');

export const {
  getRelatedGalleries,
  getRelatedGalleriesSuccess,
  getRelatedGalleriesFail
} = createAsyncAction('getRelatedGalleries', 'GET_RELATED_GALLERIES');
