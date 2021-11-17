import { IVideoResponse } from '@interface/video';
import Head from 'next/head';

type Props = {
  video: IVideoResponse;
};

const SEO = ({ video }: Props) => (
  <Head>
    <title>HoneyDrip | {video.title}</title>
    <meta name="keywords" content={video.description} />
    <meta name="description" content={video.description} />
    <meta
      property="og:title"
      content={`HoneyDrip | ${video.title}`}
      key="title"
    />
    <meta property="og:image" content={video.thumbnail} />
    <meta property="og:keywords" content={video.description} />
    <meta property="og:description" content={video.description} />
  </Head>
);

export default SEO;
