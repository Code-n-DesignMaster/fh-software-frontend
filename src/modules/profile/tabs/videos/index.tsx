import Link from 'next/link';
import usePaginatedResource from 'src/hooks/use-paginated-resource';
import { videoService } from '@services/index';
import { IPerformer } from '@interface/performer';
import { IVideo } from '@interface/video';
import { PrimaryButton } from '@components/buttons';
import VideoCard from './video-card';
import { Grid, Centered } from './styled';

type Props = {
  performer: IPerformer;
  currentUser: any;
};

const Videos = ({ performer, currentUser }: Props) => {
  const {
    items: videos,
    isLoading,
    loadNextPage,
    canLoadMore
  } = usePaginatedResource<IVideo>(async (limit, offset) => {
    const result = await videoService.userSearch({
      limit,
      offset,
      performerId: performer._id,
      userId: currentUser?._id || ''
    });

    return result.data;
  });

  return (
    <>
      {videos.length > 0 && (
        <Grid>
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </Grid>
      )}
      {isLoading && <p className="text-center">loading...</p>}
      {!isLoading && !videos.length && (
        <p className="text-center">No video found.</p>
      )}
      {currentUser?.isPerformer &&
        performer?.username === currentUser?.username &&
        !videos.length && (
          <div className="text-center">
            <p>Post your first video now!</p>
            <PrimaryButton>
              <Link href="/model/video-manager/upload">
                <a>Add New Video</a>
              </Link>
            </PrimaryButton>
          </div>
        )}
      {canLoadMore && (
        <Centered>
          <PrimaryButton onClick={() => loadNextPage()}>
            I want more
          </PrimaryButton>
        </Centered>
      )}
    </>
  );
};
export default Videos;
