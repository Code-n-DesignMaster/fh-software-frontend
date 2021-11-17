import { APIRequest } from './api-request';

export class PhotoService extends APIRequest {
  searchByUser(query?: { [key: string]: any }) {
    const { performerId } = query;
    return this.get(
      this.buildUrl(`/user/performer-assets/${performerId}/photos`, query)
    );
  }

  searchByPerformer(query?: { [key: string]: any }) {
    return this.get(
      this.buildUrl('/performer/performer-assets/photos/search', query)
    );
  }

  update(id: string, payload: any) {
    return this.put(`/performer/performer-assets/photos/${id}`, payload);
  }

  updatePhotoSort(payload: any) {
    return this.put('/performer/performer-assets/photos/sort', payload);
  }

  updateCover(id: string) {
    return this.put(`/performer/performer-assets/photos/cover/${id}`);
  }

  delete(id: string) {
    return this.del(`/performer/performer-assets/photos/${id}`);
  }

  uploadImages(file: File, payload: any, onProgress?: Function) {
    return this.upload(
      '/performer/performer-assets/photos/upload',
      [
        {
          fieldname: 'photo',
          file
        }
      ],
      {
        onProgress,
        customData: payload
      }
    );
  }

  searchPhotosInGallery(payload) {
    return this.get(
      this.buildUrl('/performer/performer-assets/photos/search', payload)
    );
  }

  userSearch(performerId, payload, headers?: { [key: string]: string }) {
    return this.get(
      this.buildUrl(`/user/performer-assets/${performerId}/photos`, payload),
      headers
    );
  }
}

export const photoService = new PhotoService();
