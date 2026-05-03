import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchStart, fetchSuccess, fetchFailure, resetFeed, toggleLike } from '../store/feedSlice';

export const useFeed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, hasMore } = useSelector((state: RootState) => state.feed);

  const loadFeed = async () => {
    if (!hasMore || loading) return;
    dispatch(fetchStart());
    try {
      // Replace with real API call
      await new Promise((res) => setTimeout(res, 800));
      dispatch(fetchSuccess([])); // real data goes here
    } catch (e: any) {
      dispatch(fetchFailure(e.message));
    }
  };

  const refresh = () => {
    dispatch(resetFeed());
    loadFeed();
  };

  const like = (id: string) => dispatch(toggleLike(id));

  return { items, loading, error, hasMore, loadFeed, refresh, like };
};
