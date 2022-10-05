import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sortingReducer from '../features/SortingArea/sorting/sortingSlice';

export const store = configureStore({
  reducer: {
    sorting: sortingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
