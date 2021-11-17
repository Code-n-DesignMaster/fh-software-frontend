// eslint-disable-next-line no-shadow
export enum ScreenSize {
  SM = 375,
  MD = 768,
  LG = 1200
}

const mq = {
  medium: `@media (min-width: ${ScreenSize.MD / 16}em)`,
  large: `@media (min-width: ${ScreenSize.LG / 16}em)`
};

export default mq;
