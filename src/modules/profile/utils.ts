import { message } from 'antd';

export const validateFile = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must be smaller than 5MB!');
  }
  return isJpgOrPng && isLt5M;
};
