import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface sortingState {
    arr: []
}


export const sortingSlice = createSlice({
    name: 'sorting',
    initialState: {
        array: [],
        arraySize: 0,
    },
    reducers: {
        shuffle: (state) => {
            state.array = [];
            
        },

        sizeChange: (state) => {
            
        },

        bubbleSort: (state) => {

        },

        selectionSort: (state) => {

        },

        quickSort: (state) => {

        },

        mergeSort: (state) => {

        },


    }
});