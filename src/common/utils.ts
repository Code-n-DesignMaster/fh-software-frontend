export const NameRegex =
  /^[a-zA-ZàáâäãåąāčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĀĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

export const UsernameRegex = /^[A-Za-z0-9_]+$/;

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const formatDuration = (s: string) => {
  if (!s) {
    return '00:00';
  }
  const secNum: any = parseInt(s, 10);
  let hours: any = Math.floor(secNum / 3600);
  let minutes: any = Math.floor((secNum - hours * 3600) / 60);
  let seconds: any = secNum - hours * 3600 - minutes * 60;

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${(hours ? `${hours}:` : '') + minutes}:${seconds}`;
};
