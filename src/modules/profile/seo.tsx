import Head from 'next/head';
import { IPerformer } from '@interface/performer';

type Props = {
  performer: IPerformer;
};

const SEO = ({ performer }: Props) => (
  <Head>
    <title>{`honeydrip.com | ${performer?.username}`}</title>
    <meta
      name="keywords"
      content={`${performer?.username}, ${performer?.name}`}
    />
    <meta name="description" content={performer?.bio} />
    {/* OG tags */}
    <meta
      property="og:title"
      content={`honeydrip.com: ${performer?.name}`}
      key="title"
    />
    <meta property="og:image" content={performer?.avatar || '/no-avatar.png'} />
    <meta
      property="og:keywords"
      content={`${performer?.username}, ${performer?.name}`}
    />
    <meta
      property="og:description"
      content={`honeydrip.com: ${performer?.name}`}
    />
  </Head>
);

export default SEO;
