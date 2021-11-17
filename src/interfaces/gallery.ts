import { ISearch } from './utils';
import { IPerformer } from './performer';

export interface IGallery {
  _id?: string;
  name?: string;
  description?: string;
  status?: string;
  isSaleGallery?: boolean;
  price?: number;
  token?: number;
  performerId?: string;
  coverPhoto?: { thumbnails?: string[]; url?: string };
  stats?: {
    views?: number;
    likes?: number;
    comments?: number;
  };
  performer?: { username: string, name?: string, avatarPath?: string, _id: string, avatar?: string, freeSubsribeSwitch?: boolean, subsribeSwitch?: boolean };
  userReaction?: {
    liked?: boolean;
    favourited?: boolean;
    watchedLater?: boolean;
  }
  isBought: boolean;
  includeAdmin: boolean;
  isPrivateChat?: boolean;
  numOfItems: number;
}

export interface IGalleryResponse {
  _id?: string;
  name?: string;
  description?: string;
  status?: string;
  isSaleGallery?: boolean;
  price?: number;
  token?: number;
  performerId?: string;
  coverPhoto?: { thumbnails?: string[]; url?: string };
  stats?: {
    views?: number;
    likes?: number;
    comments?: number;
  };
  performer?:IPerformer;
  userReaction?: {
    liked?: boolean;
    favourited?: boolean;
    watchedLater?: boolean;
  }
  isBought: boolean;
  isSubscribed: boolean;
  isFreeSubscribed: boolean;
  includeAdmin: boolean;
}

export interface IGalleryCreate {
  name: string;
  description?: string;
  status: string;
  isSaleGallery?: boolean;
  price?: number;
  isPrivateChat?: boolean;
}

export interface IGallerySearch extends ISearch {
  sort: string;
  sortBy: string;
}
