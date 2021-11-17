import { useState, useEffect } from 'react';

type LoaderFn<T> = (
  limit: number,
  offset: number
) => Promise<{
  data: readonly T[];
  total: number;
}>;

type Options = {
  dependencies?: any[];
  pageSize?: number;
};

const usePaginatedResource = <T>(
  loader: LoaderFn<T>,
  options: Options = {}
) => {
  const [items, setItems] = useState<readonly T[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const settings = { pageSize: 24, dependencies: [], ...options };

  const loadItems = async (firstLoad = false) => {
    setLoading(true);
    if (firstLoad) {
      const result = await loader(settings.pageSize, 0);
      setItems(result.data);
      setPage(1);
      setTotal(result.total);
    } else {
      const result = await loader(settings.pageSize, page * settings.pageSize);
      setItems((existing) => [...existing, ...result.data]);
      setPage((p) => p + 1);
      setTotal(result.total);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadItems(true);
  }, settings.dependencies);

  return {
    items,
    isLoading,
    total,
    canLoadMore: items.length > 0 && items.length < total,
    loadNextPage: loadItems
  };
};

export default usePaginatedResource;
