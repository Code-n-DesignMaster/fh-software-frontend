import { useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Banner } from '@components/common';
import PerformerCard from '@components/performer-card';
import { PrimaryButton } from '@components/buttons';
import { RootState } from '@redux/store';
import { getBanners } from '@redux/banner/actions';
import { performerService } from '@services/index';
import SEO from './seo';
import { Wrapper, Inner, PerformerList, AllCreators } from './styled';

type InitialProps = {
  performers: any[];
};

const Home: NextPage<InitialProps> = ({ performers }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.current);
  const banners = useSelector(
    (state: RootState) => state.banner.listBanners.data
  );
  const { topBanners, middleBanners, bottomBanners } = useMemo(() => {
    if (banners && banners.data && banners.data.length > 0) {
      return {
        topBanners: banners.data.filter((b) => b.position === 'top'),
        middleBanners: banners.data.filter((b) => b.position === 'middle'),
        bottomBanners: banners.data.filter((b) => b.position === 'bottom')
      };
    }
    return {
      topBanners: [],
      middleBanners: [],
      bottomBanners: []
    };
  }, [banners]);

  useEffect(() => {
    dispatch(getBanners({ status: 'active' }));
  }, []);

  return (
    <>
      <SEO />
      <Wrapper>
        <Inner>
          {topBanners.length > 0 && <Banner banners={topBanners} />}
          <PerformerList>
            {performers
              .sort((a, b) => b.feature - a.feature)
              .filter((p) => !(user && user._id === p._id))
              .map((p) => (
                <PerformerCard performer={p} key={p._id} />
              ))}
          </PerformerList>
          <AllCreators>
            <Link href="/model">
              <PrimaryButton as="a">All Creators</PrimaryButton>
            </Link>
          </AllCreators>
          {middleBanners.length > 0 && <Banner banners={middleBanners} />}
          {bottomBanners.length > 0 && <Banner banners={bottomBanners} />}
        </Inner>
      </Wrapper>
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  const { query } = ctx;
  try {
    const performers = await (
      await performerService.getTopPerformer({
        limit: 40,
        userId: query?.id ? query.id : ''
      })
    ).data.data;
    return {
      performers: performers || []
    };
  } catch (e) {
    return {
      performers: []
    };
  }
};

// @ts-ignore
Home.authenticate = true;
// @ts-ignore
Home.noredirect = true;

export default Home;
