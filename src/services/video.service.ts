import { IVideo } from '@interface/video';
import config from 'src/common/config';
import { APIRequest } from './api-request';

export type UserSearchResponse = {
  data: readonly IVideo[];
  total: number;
};

export class VideoService extends APIRequest {
  search(query?: { [key: string]: any }) {
    return this.get(
      this.buildUrl('/performer/performer-assets/videos/search', query)
    );
  }

  userSearch(query?: { [key: string]: any }) {
    return this.get<UserSearchResponse>(
      this.buildUrl('/user/performer-assets/videos/search', query)
    );
  }

  delete(id: string) {
    return this.del(`/performer/performer-assets/videos/${id}`);
  }

  findById(id: string, headers?: { [key: string]: string }) {
    return this.get(`/performer/performer-assets/videos/${id}/view`, headers);
  }

  findOne(id: string, headers?: { [key: string]: string }) {
    return this.get(`/user/performer-assets/videos/${id}`, headers);
  }

  update(id: string, payload: any) {
    return this.put(`/performer/performer-assets/videos/${id}`, payload);
  }

  increaseView(id: string) {
    return this.post(`/user/performer-assets/videos/${id}/inc-view`);
  }

  getVideoThumnailUploadUrl(id: string) {
    return `${config.apiEndpoint}/performer/performer-assets/videos/${id}/update-video-thumbnail`;
  }

  uploadVideo(
    files: [{ fieldname: string; file: File }],
    payload: any,
    onProgress?: Function
  ) {
    return this.upload('/performer/performer-assets/videos/upload', files, {
      onProgress,
      customData: payload
    });
  }

  getFavouriteVideos(payload) {
    return this.get(this.buildUrl('/reactions/videos/favourites', payload));
  }

  getWatchLateVideos(payload) {
    return this.get(this.buildUrl('/reactions/videos/watch-later', payload));
  }
}

export const videoService = new VideoService();
