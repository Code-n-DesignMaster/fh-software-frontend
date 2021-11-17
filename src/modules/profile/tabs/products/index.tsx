import usePaginatedResource from 'src/hooks/use-paginated-resource';
import { productService } from '@services/index';
import { IPerformer } from '@interface/performer';
import { IProduct } from '@interface/product';
import { PerformerListProduct } from '@components/product/performer-list-product';
import { PrimaryButton } from '@components/buttons';

type Props = {
  performer: IPerformer;
  currentUser: any;
};

const Products = ({ performer, currentUser }: Props) => {
  const {
    items: products,
    isLoading,
    canLoadMore,
    loadNextPage
  } = usePaginatedResource<IProduct>(async (limit, offset) => {
    const result = await productService.userSearch({
      limit,
      offset,
      performerId: performer._id,
      userId: currentUser?._id || ''
    });

    return result.data;
  });

  return (
    <>
      {products.length > 0 && <PerformerListProduct products={products} />}
      {isLoading && <p className="text-center">loading...</p>}
      {!isLoading && !products.length && (
        <p className="text-center">No product found.</p>
      )}
      {canLoadMore && (
        <p className="text-center">
          <PrimaryButton onClick={() => loadNextPage()}>
            I want more
          </PrimaryButton>
        </p>
      )}
    </>
  );
};
export default Products;
