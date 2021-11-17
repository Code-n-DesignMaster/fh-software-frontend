import Head from 'next/head';
import { IGalleryResponse } from '@interface/gallery';

type Props = {
  gallery: IGalleryResponse;
};

const SEO = ({ gallery }: Props) => (
  <Head>
    <title>HoneyDrip | {gallery.name || 'Gallery'}</title>
    <meta name="keywords" content={gallery.description} />
    <meta name="description" content={gallery.description} />
    {/* OG tags */}
    <meta
      property="og:title"
      content={`HoneyDrip | ${gallery.name || 'Gallery'}`}
      key="title"
    />
    <meta property="og:keywords" content={gallery.description} />
    <meta property="og:description" content={gallery.description} />
    <meta property="og:image" content="https://honeydrip.com/logo.png" />
  </Head>
);

export default SEO;
