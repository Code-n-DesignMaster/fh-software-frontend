import { IGallery, IGalleryCreate } from 'src/interfaces';
import { APIRequest } from './api-request';

type UserSearchResponse = {
  data: readonly IGallery[];
  total: number;
};

class GalleryService extends APIRequest {
  create(payload: IGalleryCreate) {
    return this.post('/performer/performer-assets/galleries', payload);
  }

  search(param?: any) {
    return this.get(
      this.buildUrl('/performer/performer-assets/galleries/search', param)
    );
  }

  userSearch(param?: any) {
    return this.get<UserSearchResponse>(
      this.buildUrl('/user/performer-assets/galleries/search', param)
    );
  }

  update(id: string, payload: IGalleryCreate) {
    return this.put(`/performer/performer-assets/galleries/${id}`, payload);
  }

  findById(id: string) {
    return this.get(`/performer/performer-assets/galleries/${id}/view`);
  }
  findOne(id: string, headers?: { [key: string]: string }) {
    return this.get(`/user/performer-assets/galleries/${id}`, headers);
  }
  increaseView(id: string) {
    return this.post(`/user/performer-assets/galleries/${id}/inc-view`);
  }
  delete(id: string) {
    return this.del(`/performer/performer-assets/galleries/${id}`);
  }
  getFavouriteGalleries(payload) {
    return this.get(this.buildUrl(`/reactions/galleries/favourites`, payload));
  }
  getWatchLateGalleries(payload) {
    return this.get(this.buildUrl(`/reactions/galleries/watch-later`, payload));
  }
}

export const galleryService = new GalleryService();
