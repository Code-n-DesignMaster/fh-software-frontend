import { IGalleryResponse, IVideoResponse } from 'src/interfaces';

export const isAdmin = (user: any) =>
  (user && user.roles && user.roles.includes('admin')) || false;

export const isSale = (resource: IGalleryResponse | IVideoResponse) => {
  let isSaleResource = false;
  if ('isSaleGallery' in resource) {
    isSaleResource = resource.isSaleGallery;
  } else if ('isSaleVideo' in resource) {
    isSaleResource = resource.isSaleVideo;
  }
  return isSaleResource;
};

export const canView = (
  user: any,
  resource: IGalleryResponse | IVideoResponse
) => {
  return (
    isAdmin(user) ||
    (!isSale(resource) &&
      ((!!resource.performer.subsribeSwitch && resource.isSubscribed) ||
        (!!resource.performer.freeSubsribeSwitch &&
          resource.isFreeSubscribed) ||
        (!resource.performer.subsribeSwitch &&
          !resource.performer.freeSubsribeSwitch) ||
        (!resource.performer.subsribeSwitch &&
          resource.performer.freeSubsribeSwitch &&
          (resource.isFreeSubscribed || resource.isSubscribed)))) ||
    (isSale(resource) && resource.isBought)
  );
};

export const canBuy = (
  user: any,
  resource: IGalleryResponse | IVideoResponse
) => {
  return (
    isAdmin(user) ||
    (isSale(resource) &&
      !resource.isBought &&
      (resource.isSubscribed ||
        (!resource.performer.subsribeSwitch &&
          !!resource.performer.freeSubsribeSwitch &&
          resource.isFreeSubscribed &&
          !resource.isSubscribed) ||
        (!resource.performer.subsribeSwitch &&
          !resource.performer.freeSubsribeSwitch)))
  );
};

export const shouldSubscribe = (
  user: any,
  resource: IGalleryResponse | IVideoResponse
) => {
  return (
    isAdmin(user) ||
    (!!resource.performer.subsribeSwitch && !resource.isSubscribed) ||
    (!!resource.performer.freeSubsribeSwitch &&
      !resource.isFreeSubscribed &&
      !resource.isSubscribed)
  );
};

export const getSource = (resource: IGalleryResponse | IVideoResponse) => {
  if ('isSaleGallery' in resource) {
    return resource.coverPhoto.thumbnails?.[0];
  }

  if ('isSaleVideo' in resource) {
    return resource.thumbnail;
  }
};

export const getAlt = (resource: IGalleryResponse | IVideoResponse) => {
  if ('isSaleGallery' in resource) {
    return resource.name;
  }

  if ('isSaleVideo' in resource) {
    return resource.title;
  }
};
