import { galleryService } from 'src/services';
import { flatten } from 'lodash';
import { put } from 'redux-saga/effects';
import { createSagas } from '@lib/redux';
import { IReduxAction } from 'src/interfaces';
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
} from "./actions";

const gallerySagas = [
  {
    on: getGalleries,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield galleryService.userSearch(data.payload);
        yield put(getGalleriesSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(getGalleriesFail(error));
      }
    }
  },
  {
    on: moreGallery,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield galleryService.userSearch(data.payload);
        yield put(moreGallerySuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreGalleryFail(error));
      }
    }
  },
  {
    on: getRelatedGalleries,
    *worker(data: IReduxAction<any>) {
      try {
        const resp = yield galleryService.userSearch(data.payload);
        yield put(getRelatedGalleriesSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(getRelatedGalleriesFail(error));
      }
    }
  }
];

export default flatten([createSagas(gallerySagas)]);
