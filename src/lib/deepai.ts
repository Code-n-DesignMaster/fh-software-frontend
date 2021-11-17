import deepai from 'deepai';
import env from 'src/env';

export function detection(imgUrl: string) {
  deepai.setApiKey(env.deepai_apiKey);
  return new Promise((resolve) => {
    setTimeout(() => {
      const resp = deepai.callStandardApi('nsfw-detector', {
        image: imgUrl
      });
      resolve(resp);
    }, 0);
  });
}

export function getBase64(url) {
  return new Promise((resolve, reject) => {
    const Img = new Image();
    let dataURL = '';
    Img.setAttribute('crossOrigin', 'Anonymous');
    Img.src = `${url}&v=${Math.random()}`;
    Img.onload = function () {
      const canvas = document.createElement('canvas');
      const { width } = Img;
      const { height } = Img;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(Img, 0, 0, width, height);
      dataURL = canvas.toDataURL('image/jpeg');
      resolve(dataURL);
    };
  });
}
