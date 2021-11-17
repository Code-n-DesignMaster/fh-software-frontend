import usePaginatedResource from 'src/hooks/use-paginated-resource';
import Link from 'next/link';
import { galleryService } from '@services/index';
import { IPerformer } from '@interface/performer';
import { PrimaryButton } from '@components/buttons';
import { IGallery } from '@interface/gallery';
import GalleryCard from './gallery-card';
import { Grid, Centered } from './styled';

type Props = {
  performer: IPerformer;
  currentUser: any;
};

const Galleries = ({ performer, currentUser }: Props) => {
  const {
    items: galleries,
    isLoading,
    canLoadMore,
    loadNextPage
  } = usePaginatedResource<IGallery>(async (limit, offset) => {
    const result = await galleryService.userSearch({
      limit,
      offset,
      performerId: performer._id,
      userId: currentUser?._id || ''
    });
    return result.data;
  });

  return (
    <>
      {galleries.length > 0 && (
        <Grid>
          {galleries.map((gallery) => (
            <GalleryCard key={gallery._id} gallery={gallery} />
          ))}
        </Grid>
      )}
      {isLoading && <p className="text-center">loading...</p>}
      {!isLoading && !galleries.length && (
        <p className="text-center">No galleries found.</p>
      )}
      {currentUser?.isPerformer &&
        performer?.username === currentUser?.username &&
        !galleries.length && (
          <div className="text-center">
            <p>Post your first gallery now!</p>
            <PrimaryButton>
              <Link href="/model/gallery-manager/create">
                <a>Add New Gallery</a>
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
export default Galleries;
