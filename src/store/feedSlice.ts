import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedItem {
  id: string;
  headline: string;
  thumbnail: string;
  author: string;
  timeAgo: string;
  likes: number;
  comments: number;
  type: 'video' | 'image';
}

interface FeedState {
  items: FeedItem[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: FeedState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<FeedItem[]>) {
      state.items = [...state.items, ...action.payload];
      state.loading = false;
      state.page += 1;
      state.hasMore = action.payload.length > 0;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetFeed(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    toggleLike(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.likes += 1;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, resetFeed, toggleLike } = feedSlice.actions;
export default feedSlice.reducer;
