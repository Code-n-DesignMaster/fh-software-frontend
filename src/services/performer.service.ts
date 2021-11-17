import { IPerformer } from 'src/interfaces';
import config from 'src/common/config';
import {
  IBanking,
  IBlockCountries,
  IBlockedByPerformer
} from '../interfaces/performer';
import { APIRequest, IResponse } from './api-request';

export class PerformerService extends APIRequest {
  search(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/performers/search', query));
  }

  me(headers?: { [key: string]: string }): Promise<IResponse<IPerformer>> {
    return this.get('/performers/me', headers);
  }

  findOne(id: string, headers?: { [key: string]: string }) {
    return this.get(`/performers/${id}`, headers);
  }

  getIdVerificationUploadUrl() {
    return `${config.apiEndpoint}/performers/id-verification/upload`;
  }

  getAvatarUploadUrl() {
    return `${config.apiEndpoint}/performers/avatar/upload`;
  }

  getCoverUploadUrl() {
    return `${config.apiEndpoint}/performers/cover/upload`;
  }

  getVideoUploadUrl() {
    return `${config.apiEndpoint}/performers/welcome-video/upload`;
  }

  getWelcomeImgUploadUrl() {
    return `${config.apiEndpoint}/performers/chat/welcomeimg/upload`;
  }

  updateMe(id: string, payload: any) {
    return this.put(`/performers/${id}`, payload);
  }

  increaseView(id: string) {
    return this.post(`/performers/${id}/inc-view`);
  }

  checkSubscribe(id: string) {
    return this.post(`/performers/${id}/check-subscribe`);
  }

  getTopPerformer(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/performers/top', query));
  }

  updateBanking(id: string, payload: IBanking) {
    return this.put(`/performers/${id}/banking-settings`, payload);
  }

  updateBlockCountries(id: string, payload: IBlockCountries) {
    return this.put(`/performers/${id}/block-countries-settings`, payload);
  }

  blockUser(payload: IBlockedByPerformer) {
    return this.post('/performers/blocked-users', payload);
  }

  unblockUser(userId: string) {
    return this.del(`/performers/blocked-users/${userId}`);
  }

  deleteAvatar() {
    return this.del(`/performers/avatar/delete`);
  }

  deleteCover() {
    return this.del(`/performers/cover/delete`);
  }
}

export const performerService = new PerformerService();
